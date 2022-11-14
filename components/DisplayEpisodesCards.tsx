import React from "react";
import { DisplayEpisodesType } from "../types/main";
import EpisodeCard from "./EpisodeCard";
import { FC, useState, useEffect } from "react";
import type { ParsedUrlQuery } from "querystring";
import Link from "next/link";
import { useRouter } from "next/router";

const DisplayEpisodeCards: FC<DisplayEpisodesType> = ({ data, search }) => {
  const router = useRouter();
  const { page }: ParsedUrlQuery = router.query;
  const [pageNumber, setPageNumber] = useState<string | number>("1");

  let lastPage = parseInt(Object.keys(data).slice(-1)[0]) + 1;

  useEffect(() => {
    if (page) {
      setPageNumber(page as string);
    }
  }, [router]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4">
        {search
          ? Object.values(data)
              .flat()
              .filter(({ name }) =>
                search
                  ? name.toLowerCase().includes(search.toLowerCase())
                  : name
              )
              .map((i, index) => <EpisodeCard key={index} data={i} />)
          : data[parseInt(pageNumber as string) - 1].map((i) => (
              <EpisodeCard key={i.id} data={i} />
            ))}
      </div>
      <div className="flex justify-center mt-2 gap-3">
        {parseInt(page as string) > 1 && (
          <div className="mt-5">
            <Link href={`/episodes?page=${parseInt(pageNumber as string) - 1}`}>
              <button>Prev page</button>
            </Link>
          </div>
        )}

        {router.pathname === "/episodes" && pageNumber < lastPage && (
          <div className="mt-5">
            <Link href={`/episodes?page=${parseInt(pageNumber as string) + 1}`}>
              <button>Next page</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayEpisodeCards;
