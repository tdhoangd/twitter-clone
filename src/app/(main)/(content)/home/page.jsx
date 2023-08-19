import PostsList from "@/components/posts-list";
import ThemeChanger from "@/components/theme-changer";
import Content from "./content";
// import * as Tabs from "@radix-ui/react-tabs";

export default function Home() {
  return (
    <>
      <div className="fi z-10 bg-th-background/60 px-4 py-2 backdrop-blur-md sticky top-0">
        <div>home page</div>
        <Content />
      </div>
      <div className="mt-20"></div>

      <ThemeChanger />

      <PostsList />
    </>
  );
}
