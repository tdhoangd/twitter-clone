import {Footer} from '@/components/right-sidebar/footer';
import {ConnectingSuggestion} from '@/components/right-sidebar/connecting-suggestion';
import {TrendingNews} from '@/components/right-sidebar/trending-news';
import {SearchBar} from '@/components/search-bar';
import {cn} from '@/utils/helpers';

export default function AppContentLayout({children}) {
  const sideBarWidth = 'hidden 2md:block w-[290px] 2lg:w-[350px]';

  return (
      <>
        <div
            className={cn(
                '!min-h-screen h-max !max-w-[600px] w-full md:w-[600px]',
                'border-0 xs:border-x border-cc-text-secondary',
            )}
        >
          {/* main content */}
          {children}
        </div>

        {/* right sidebar */}
        <div className={cn(sideBarWidth, 'mr-[10px]')}>
          <div className={cn(sideBarWidth, 'top-0 fixed h-screen')}>

            {/*"fi pb-20 h-full overflow-y-auto no-scrollbar gap-4"*/}
            <div className={cn('pb-20 h-full overflow-y-auto gap-4')}>
              <div className="sticky top-0 z-30 bg-cc-bg-primary py-1">
                <SearchBar/>
              </div>
              <TrendingNews/>
              <ConnectingSuggestion/>
              <Footer/>
            </div>
          </div>
        </div>
      </>
  );
}
