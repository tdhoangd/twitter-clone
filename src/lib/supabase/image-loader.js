"use client";

export default function supabaseLoader({ src, width, quality }) {
  const url = new URL(
    `https://zfdkdoeapvyllzhjgdqu.supabase.co/storage/v1/object/public/images/${src}`
  );
  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality || 75).toString());
  return url.href;
}
