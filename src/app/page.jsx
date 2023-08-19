import { UserAvatar } from "@/components/user-avatar";
import MainLayout from "@/components/layouts/MainLayout";
import MainContainerLayout from "@/components/layouts/MainLayout";
import ThemeChanger from "@/components/theme-changer";

export default function Index() {
  return (
    <MainLayout>
      {/* contents */}
      {}
      <ThemeChanger />

      <UserAvatar user={{ name: "Thanh Hoang", image: "images/cat.png" }} />
      {/* right sidepanel */}
      {/* RightSidepanelLayout
          - Search
          - TrendingNews
          - Suggestion
    */}
    </MainLayout>
  );
}
