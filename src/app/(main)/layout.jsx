import Header from '@/components/header/header';
import {cn} from '@/utils/helpers';

export default function MainLayout({children}) {
  return (
      <>
        {/*<div*/}
        {/*    id="layers"*/}
        {/*    className={cn(*/}
        {/*        'z-50 top-0 right-0 left-0 fixed',*/}
        {/*        'flex flex-col justify-center items-center',*/}
        {/*        'bg-gray-900 bg-opacity-50',*/}
        {/*    )}*/}
        {/*>*/}
        {/*  /!* modal *!/*/}
        {/*</div>*/}

        <div className={`w-full h-full flex justify-center gap-0`}>
          {/* Modal/Toaster */}
          <Header/>
          <main
              className={cn(
                  'w-full 2sm:w-[600px] 2md:w-[920px] 2lg:w-[990px] mr-0 2md:mr-20 lg:mr-0',
                  'flex flex-col items-stretch justify-stretch',
              )}
          >
            <div
                className="flex items-stretch justify-between w-full min-h-full grow ">
              {children}
            </div>
          </main>
        </div>
      </>
  );
}
