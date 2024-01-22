"use client";
import { useEffect, useState } from "react";
import { Loading } from "../ui/loading";
import Error from "../error";
import { TrendingCard } from "./trending-card";
import Link from "next/link";

export function TrendingNews() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        // search?q={keyword}&src=
        {
          id: 1,
          keyword: "#BlueBeetle",
          src: "Business and finance",
          isTrending: true,
        },
        {
          id: 2,
          keyword: "Evergrande",
          src: "Business and finance",
          isTrending: true,
        },
        {
          id: 3,
          keyword: "Marry Glo",
          src: "Music",
          isTrending: true,
        },
        {
          id: 4,
          keyword: "James O'Keefe",
          // src: "United States",
          isTrending: true,
        },
      ];

      setData(fakeData);
      // setData(null);
      setIsLoading(false);
    }, 1);
  }, []);

  const handleNotInterested = (id) => {
    console.log(`Item ID: ${id}, Action: Not Interested`);
    setData(data.filter((trending) => trending.id !== id));
  };

  const handleReport = (id) => {
    console.log(`Item ID: ${id}, Action: Report`);
    setData(data.filter((trending) => trending.id !== id));
  };

  return (
    <div>
      <div className="rounded-2xl bg-color-bg-2 overflow-hidden">
        {isLoading ? (
          <Loading />
        ) : !data ? (
          <Error />
        ) : (
          <>
            <div className="fi px-5 py-3 outline-none">
              <h2 className="text-xl font-bold">What&apos;s happening</h2>
            </div>
            {data.map((item, index) => (
              <TrendingCard
                key={item.id}
                trending={item}
                onNotInterested={() => handleNotInterested(item.id)}
                onReport={() => handleReport(item.id)}
              />
            ))}

            <Link
              href={"/explore/tabs/for-you"}
              className={`px-5 py-3 outline-none text-color-accent hover:bg-cc-hover-secondary`}
            >
              <span className="w-full">Show more</span>
            </Link>

            <div></div>
          </>
        )}
      </div>
    </div>
  );
}

// TrendingNewsSection
//  - NewList
//    - TrendingCard
//      - NewsTopicLabel + NewsLink
