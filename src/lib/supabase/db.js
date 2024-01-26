import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

const PAGE_SIZE = 10;

const supabase = createClientComponentClient();

export async function dbFetchUserData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non authenticated user.");

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profileData || profileError)
    throw new Error(
      "Data not found or error when fetching user: ",
      profileError
    );

  // fetch following (people the current user is following
  const { data: followingData, error: followingError } = await supabase
    .from("followers")
    .select("following_id")
    .eq("follower_id", user.id);

  if (followingError) {
    console.error("Error fetching following:", followingError);
  }

  // fetch followers, (people following the current user)
  const { data: followersData, error: followersError } = await supabase
    .from("followers")
    .select("follower_id")
    .eq("following_id", user.id);

  if (followersError) {
    console.error("Error fetching followers:", followersError);
  }

  return {
    user: profileData,
    following: followingData.map((i) => i.following_id),
    followers: followersData.map((i) => i.follower_id),
  };
}

export async function dbFetchFollowingProfiles(userId) {
  const { data: followingProfiles, error: followingError } = await supabase
    .from("followers")
    .select(
      `
    following_id,
    following: profiles!followers_following_id_fkey (id, name, username, avatar_image_path)
  `
    )
    .eq("follower_id", userId);

  if (followingError) throw followingError;
  return followingProfiles.map((fp) => fp.following);
}

export async function dbFetchFollowersProfiles(userId) {
  const { data: followersProfiles, error: followersError } = await supabase
    .from("followers")
    .select(
      `
    follower_id,
    followers: profiles!followers_follower_id_fkey (id, name, username, avatar_image_path)
  `
    )
    .eq("following_id", userId);

  if (followersError) throw followersError;
  return followersProfiles.map((fp) => fp.followers);
}

export async function dbFetchProfile({ username }) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, posts(count) ")
    .eq("username", username)
    .single();

  if (error || !data) return null;
  return data;
}

export async function dbFetchSuggestedProfiles({ limit }) {
  let query = supabase
    .from("profiles")
    .select("id, name, username, avatar_image_path, bio")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function dbUpdateLike({ user_id, post_id, type = "like" }) {
  if (type === "like") {
    const { error } = await supabase.from("likes").insert({ user_id, post_id });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("likes")
      .delete()
      .match({ user_id, post_id });
    if (error) throw error;
  }
  return true;
}

export async function dbUpdateBookmark({
  user_id,
  post_id,
  type = "bookmark",
}) {
  if (type === "bookmark") {
    const { error } = await supabase
      .from("bookmarks")
      .insert({ user_id, post_id });
    if (error) throw error;
  } else {
    const { error } = await supabase.from("bookmarks").delete().match({
      user_id,
      post_id,
    });
    if (error) throw error;
  }
}

export async function dbUpdateRepost({ user_id, post_id, type = "repost" }) {
  if (type === "repost") {
    const { error, data } = await supabase
      .from("reposts")
      .insert({ user_id, post_id })
      .select()
      .single();
    if (error) throw error;

    return data;
  } else {
    const { error } = await supabase.from("reposts").delete().match({
      user_id,
      post_id,
    });
    if (error) throw error;
  }
}

export async function dbUpdateFollow({
  user_id,
  user_target_id,
  type = "follow",
}) {
  if (type === "follow") {
    const { error } = await supabase.from("followers").insert({
      follower_id: user_id,
      following_id: user_target_id,
    });
    if (error) {
      throw error;
    }
  } else {
    const { error } = await supabase
      .from("followers")
      .delete()
      .match({ follower_id: user_id, following_id: user_target_id });
    if (error) {
      throw error;
    }
  }

  return true;
}

export async function dbCreateAndFetchPost({
  user_id,
  content,
  reply_to_id,
  original_id,
}) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      content,
      user_id,
      reply_to_id,
      original_id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function dbUploadImage(user_id, image) {
  const fileName = `${user_id}/${uuidv4()}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, image);

  if (error) throw error;
  return data.path;
}

export async function dbUploadImages({ user_id, images }) {
  if (images.length < 1) return null;

  const uploadPromises = images.map(async (image) => {
    const fileName = `${user_id}/${image.id}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, image.image);

    if (error) throw error;

    return data.path;
  });

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
}

export async function dbCreateNewPost({
  user_id,
  content,
  images,
  reply_to_id,
  original_id,
}) {
  try {
    const post = await dbCreateAndFetchPost({
      user_id,
      content,
      reply_to_id,
      original_id,
    });
    if (!post) throw new Error("Failed to create post, no post return");

    const imagePaths = await dbUploadImages({ user_id, images });
    if (images.length > 0 && !imagePaths) {
      throw new Error("Failed to upload images. ImagePaths not found!");
    }

    if (imagePaths) {
      const imageLinkPromisses = imagePaths.map(async (filePath) => {
        const { error } = await supabase.from("post_images").insert({
          post_id: post.id,
          image_url: filePath,
        });
        if (error) throw error;
      });
      await Promise.all(imageLinkPromisses);
    }

    return {
      postId: post.id,
      post,
    };
  } catch (error) {
    console.error("Error in addNewPost:", error);
    throw error;
  }
}

export async function dbUpdateUserProfile({
  user,
  name,
  bio,
  location,
  website,
  avatarImage,
  coverImage,
}) {
  try {
    let avatarImagePath = user.avatar_image_path;
    let coverImagePath = user.cover_image_path;

    if (avatarImage && user.avatar_image_path !== avatarImage.url) {
      avatarImagePath = await dbUploadImage(user.id, avatarImage.image);
    }

    if (coverImage && user.cover_image_path !== coverImage.url) {
      coverImagePath = await dbUploadImage(user.id, coverImage.image);
    }

    const { error, data } = await supabase
      .from("profiles")
      .update({
        name,
        bio,
        location,
        website,
        avatar_image_path: avatarImagePath,
        cover_image_path: coverImagePath,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

export async function dbDeletePost({ user_id, post_id }) {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", post_id)
    .eq("user_id", user_id);

  if (error) throw error;

  return;
}

function preprocessPosts(userId, posts) {
  return posts.map((post) => {
    return {
      ...post,
      key: post.key || post.id,
      reposter: post.reposter || null,
      is_liked: post.likes?.length > 0,
      is_bookmarked: post.bookmarks?.length > 0,
      is_reposted: post.reposted_by === userId || post.reposts?.length > 0,
      reply_to_username: post.reply_to_username || null,
      // your_repostd: userId === post.reposted_by,
    };
  });
}

export async function dbFetchSourcePosts(user_id, repostIds) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
    author:profiles(*),
    likes (id),
    bookmarks (id),
    reposts (id)
    `
    )
    .in("id", repostIds)
    .eq("likes.user_id", user_id)
    .eq("bookmarks.user_id", user_id)
    .eq("reposts.user_id", user_id);

  if (error) {
    console.error("Error fetching original posts:", error);
    return [];
  }

  return preprocessPosts(user_id, data);
}

async function dbProcessReplies(userId, posts) {
  const postIds = new Set(posts.map((post) => post.id));

  const idsSet = new Set();
  posts.forEach((post) => {
    if (post.reply_to_id && !postIds.has(post.reply_to_id)) {
      idsSet.add(post.reply_to_id);
    }
    if (post.original_id && !postIds.has(post.original_id)) {
      idsSet.add(post.original_id);
    }
  });
  const idsArray = Array.from(idsSet);
  const sourcePosts = await dbFetchPostsByIds(userId, idsArray);

  const mergedPostMap = new Map();
  posts.forEach((post) => mergedPostMap.set(post.key, post));
  sourcePosts.forEach((post) => mergedPostMap.set(post.key, post));

  const mergedPosts = Array.from(mergedPostMap.values());

  const finalPosts = mergedPosts.map((post) => {
    if (post.reply_to_id && mergedPostMap.has(post.reply_to_id)) {
      return {
        ...post,
        reply_to_username: mergedPostMap.get(post.reply_to_id).author.username,
      };
    }
    return post;
  });

  return finalPosts;
}

const dbFetchPostsForeigns = async (userId, postIds) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      likes (id),
      bookmarks (id),
      reposts (id),
      images:post_images(id, post_id, image_url)
    `
    )
    .in("id", postIds)
    .eq("likes.user_id", userId)
    .eq("bookmarks.user_id", userId)
    .eq("reposts.user_id", userId);

  if (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  return data;
};

// #####################################################/
export async function dbFetchTimeline({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;

  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .rpc("get_timeline")
    .is("reply_to_id", null)
    .lte("created_at", timeAnchor)
    .order("timeline_created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }

  const postIds = [...new Set(data.map((post) => post.id))];
  const userInteractions = await dbFetchPostsForeigns(userId, postIds);
  const postsWithInteractions = data.map((post) => {
    const interaction = userInteractions.find((inter) => inter.id === post.id);

    const {
      reposter_id,
      reposter_name,
      reposter_username,
      reposter_avatar_image_path,
      author_id,
      author_name,
      author_username,
      author_avatar_image_path,
      ...restOfPost
    } = post;

    return {
      ...restOfPost,
      author: {
        id: author_id,
        name: author_name,
        username: author_username,
        avatar_image_path: author_avatar_image_path,
      },
      reposter: {
        id: reposter_id,
        name: reposter_name,
        username: reposter_username,
        avatar_image_path: reposter_avatar_image_path,
      },
      likes: interaction.likes,
      bookmarks: interaction.bookmarks,
      reposts: interaction.reposts,
      images: interaction.images,
    };
  });

  const posts = preprocessPosts(userId, postsWithInteractions);

  return posts;
  // return [];
}

export async function dbFetchFollowingPosts({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, following }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;

  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .rpc("get_timeline")
    .in("author_id", [userId, ...following])
    .lte("created_at", timeAnchor)
    // .or(`author_id.eq.${userId},reposter_id.eq.${userId}`)
    .order("timeline_created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }

  const postIds = [...new Set(data.map((post) => post.id))];
  const userInteractions = await dbFetchPostsForeigns(userId, postIds);
  const postsWithInteractions = data.map((post) => {
    const interaction = userInteractions.find((inter) => inter.id === post.id);

    const {
      reposter_id,
      reposter_name,
      reposter_username,
      reposter_avatar_image_path,
      author_id,
      author_name,
      author_username,
      author_avatar_image_path,
      ...restOfPost
    } = post;

    return {
      ...restOfPost,
      author: {
        id: author_id,
        name: author_name,
        username: author_username,
        avatar_image_path: author_avatar_image_path,
      },
      reposter: {
        id: reposter_id,
        name: reposter_name,
        username: reposter_username,
        avatar_image_path: reposter_avatar_image_path,
      },
      likes: interaction.likes,
      bookmarks: interaction.bookmarks,
      reposts: interaction.reposts,
      images: interaction.images,
    };
  });

  const posts = preprocessPosts(userId, postsWithInteractions);
  const finalPosts = await dbProcessReplies(userId, posts);

  return finalPosts;
}

export async function dbFetchBookmarkPosts({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, postId }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    *, user_id,
    author: profiles(id, username, name, avatar_image_path),
    likes (id),
    bookmarks !inner(id),
    reposts (id),
    images: post_images(id, post_id, image_url)
    `
    )
    .eq("likes.user_id", userId)
    .eq("bookmarks.user_id", userId)
    .eq("reposts.user_id", userId)
    .lte("created_at", timeAnchor)
    .order("created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) throw error;

  const posts = await preprocessPosts(userId, data);

  return posts;
}

export async function dbFetchPost({ postId, repostId, userId }) {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      author:profiles(id, username, name, avatar_image_path),
      likes (id),
      bookmarks (id),
      reposts (id),
      images: post_images(id, post_id, image_url)
      `
    )
    .eq("id", postId)
    .eq("likes.user_id", userId)
    .eq("bookmarks.user_id", userId)
    .eq("reposts.user_id", userId);

  if (error) throw error;
  if (data && data.length < 1) return null;

  let post = data[0];

  if (repostId) {
    const { data: repostData, error: repostError } = await supabase
      .from("reposts")
      .select("*, reposter:profiles(id, username, name, avatar_image_path)")
      .eq("id", repostId)
      .single();

    if (error) throw error;

    if (repostData) {
      post = {
        ...post,
        key: repostData.id,
        reposter: repostData.reposter,
      };
    }
  }

  const processedPosts = await preprocessPosts(userId, [post]);

  return processedPosts[0];
}

export async function dbFetchRepliesToPost({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, postId }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;
  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    author: profiles(id, name, username, avatar_image_path),
    likes (id),
    bookmarks (id),
    reposts (id),
    images: post_images(id, post_id, image_url)
    `
    )
    .eq("reply_to_id", postId)
    .eq("likes.user_id", userId)
    .eq("bookmarks.user_id", userId)
    .eq("reposts.user_id", userId)
    .lte("created_at", timeAnchor)
    .order("created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) throw error;

  const posts = await preprocessPosts(userId, data);
  return posts;
}

async function dbFetchPostsByIds(userId, idsArray) {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `*,
    author: profiles (id, name, username, avatar_image_path),
    likes (id),
    bookmarks (id),
    reposts (id),
    images: post_images(id, post_id, image_url)
    `
    )
    .in("id", idsArray)
    .eq("likes.user_id", userId)
    .eq("bookmarks.user_id", userId)
    .eq("reposts.user_id", userId);

  if (error) throw error;

  const posts = preprocessPosts(userId, data);

  return posts;
}

export async function dbFetchProfilePosts({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, profileId }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;

  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .rpc("get_timeline")
    .is("reply_to_id", null)
    .or(`author_id.eq.${profileId},reposter_id.eq.${profileId}`)
    .lte("created_at", timeAnchor)
    .order("timeline_created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) throw error;

  const postIds = [...new Set(data.map((post) => post.id))];
  const userInteractions = await dbFetchPostsForeigns(userId, postIds);
  const postsWithInteractions = data.map((post) => {
    const interaction = userInteractions.find((inter) => inter.id === post.id);

    const {
      reposter_id,
      reposter_name,
      reposter_username,
      reposter_avatar_image_path,
      author_id,
      author_name,
      author_username,
      author_avatar_image_path,
      ...restOfPost
    } = post;

    return {
      ...restOfPost,
      author: {
        id: author_id,
        name: author_name,
        username: author_username,
        avatar_image_path: author_avatar_image_path,
      },
      reposter: {
        id: reposter_id,
        name: reposter_name,
        username: reposter_username,
        avatar_image_path: reposter_avatar_image_path,
      },
      likes: interaction.likes,
      bookmarks: interaction.bookmarks,
      reposts: interaction.reposts,
      images: interaction.images,
    };
  });

  const posts = preprocessPosts(userId, postsWithInteractions);
  return posts;
}

export async function dbFetchProfileReplies({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, profileId }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;

  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .rpc("get_timeline")
    .or(`author_id.eq.${profileId},reposter_id.eq.${profileId}`)
    .lte("created_at", timeAnchor)
    .order("timeline_created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) throw error;

  const postIds = [...new Set(data.map((post) => post.id))];
  const userInteractions = await dbFetchPostsForeigns(userId, postIds);
  const postsWithInteractions = data.map((post) => {
    const interaction = userInteractions.find((inter) => inter.id === post.id);

    const {
      reposter_id,
      reposter_name,
      reposter_username,
      reposter_avatar_image_path,
      author_id,
      author_name,
      author_username,
      author_avatar_image_path,
      ...restOfPost
    } = post;

    return {
      ...restOfPost,
      author: {
        id: author_id,
        name: author_name,
        username: author_username,
        avatar_image_path: author_avatar_image_path,
      },
      reposter: {
        id: reposter_id,
        name: reposter_name,
        username: reposter_username,
        avatar_image_path: reposter_avatar_image_path,
      },
      likes: interaction.likes,
      bookmarks: interaction.bookmarks,
      reposts: interaction.reposts,
      images: interaction.images,
    };
  });

  const posts = preprocessPosts(userId, postsWithInteractions);
  const finalPosts = await dbProcessReplies(userId, posts);

  return finalPosts;
}

export async function dbFetchProfileLikes({ pageParam, queryKey }) {
  const [_, { userId, timeAnchor, pageSize, profileId }] = queryKey;
  const starIndex = pageParam * pageSize;
  const endIndex = starIndex + pageSize - 1;

  const supabase = createClientComponentClient();

  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("user_id", profileId)
    .order("created_at", { ascending: false })
    .range(starIndex, endIndex);

  if (error) throw error;
  if (data && data.length < 1) return [];

  const posts = await dbFetchPostsByIds(
    userId,
    data.map((like) => like.post_id)
  );
  return posts;
}
