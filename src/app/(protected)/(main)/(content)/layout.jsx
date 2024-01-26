import { ConnectingSuggestion } from "@/components/right-sidebar/connecting-suggestion";
import { Footer } from "@/components/right-sidebar/footer";
import { TrendingNews } from "@/components/right-sidebar/trending-news";
import { SearchBar } from "@/components/search-bar";

export default function AppContentLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen w-full shrink-0 grow basis-auto items-stretch justify-between">
        <div className="w-full !2sm:w-[600px] 2sm:max-w-[600px] 2sm:min-w-[600px] border-l-0 border-r-0 border-color-border xs:border-l 2sm:border-r">
          <div className="w-full !2sm:w-[598px] 2sm:max-w-[598px] 2sm:min-w-[598px]">
            <div className="h-fit flex flex-col">{children}</div>
          </div>
        </div>

        {/*/!* right panel *!/*/}
        <div className="hidden md:block mr-[10px] 3xl:mr-[70px] md:w-[290px] xl:w-[350px]">
          <div className="top-0 fixed h-screen md:w-[290px] xl:w-[350px]">
            <div className="pb-20 h-full overflow-y-auto gap-4 flex flex-col">
              <div className="sticky top-0 z-10 bg-color-bg py-1">
                <SearchBar />
              </div>
              <TrendingNews />
              <ConnectingSuggestion />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
