import Footer from "@/components/right-sidebar/footer";
import Suggestion from "@/components/right-sidebar/suggestion";
import TrendingNews from "@/components/right-sidebar/trending-news";
import SearchBar from "@/components/search-bar";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Home / X",
  description: "Not a real X - built with Nextjs and Tailwindcss",
};

export default function AppLayout({ children }) {
  const sideBarWidth = "hidden 2md:block w-[290px] 2lg:w-[350px]";

  return (
    <>
      <div
        className={cn(
          "!min-h-screen h-full !max-w-[600px] w-full md:w-[600px]",
          "fi shrink-0 grow-0  border-x border-th-primary-light"
        )}
      >
        {/* main content */}
        {children}
      </div>

      {/* right sidebar */}
      <div className={cn(sideBarWidth, "mr-[10px]")}>
        <div className={cn(sideBarWidth, "top-0 fixed h-screen")}>
          <div className="fi pb-20 h-full overflow-y-auto no-scrollbar gap-4">
            <div className="sticky top-0 z-30 bg-th-background py-1">
              <SearchBar />
            </div>
            <TrendingNews />
            <Suggestion />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
