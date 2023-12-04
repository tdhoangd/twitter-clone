import {getSession} from '@/app/supabase-server';
import {redirect} from 'next/navigation';
import NewTweet from './new-tweet';
import {
  HomePageContent,
} from '@/app/(main)/(content)/home/home-page-content.component';
import HomeContent from '@/app/(main)/(content)/home/home-content';

export default async function HomePage() {
  const [session] = await Promise.all([getSession()]);

  if (!session) {
    return redirect('/login');
  }

  return (
      <>
        <NewTweet user={session.user}/>
        <HomePageContent/>
        <HomeContent user={session.user}/>
      </>
  )
      ;
}

{/* <div className="flex space-x-4 w-full">
          <div className="relative w-1/2 text-center items-center ">
            <div className="w-fit">
              <p className="py-4 inline-block w-fit">For You</p>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-red-300"></span>
            </div>
          </div>
          <div className="w-1/2 text-center items-center">
            <p className="py-4 inline-block">Following</p>
          </div>
        </div> */
}

{/* <div className={`flex-grow`}>
          <div className={`flex flex-row relative items-stretch`}>
            <div className="flex-grow">
              <div className="px-4 min-w-[56px] h-[53px]">
                <div className="relative flex py-4 ">
                  <div className="px-4 items-center flex flex-col ">
                    For You
                  </div>
                  <span className="h-1 bg-red-200"></span>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <div>Following</div>
            </div>
          </div>
        </div> */
}
