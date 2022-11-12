import React, { useEffect, useState } from "react";
import { Character, DisplayCharactersType, Episode } from "../types/main";
import CharacterCard from "./CharacterCard";
import { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

const DisplayCharacterCards: FC<DisplayCharactersType> = ({ data, search }) => {
  const router = useRouter();
  const { page }: ParsedUrlQuery = router.query;
  const [pageNumber, setPageNumber] = useState<string | number>("1");

  let lastPage = parseInt(Object.keys(data).slice(-1)[0]);

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
              .map((i, index) => <CharacterCard key={index} data={i} />)
          : data[pageNumber].map((i, index) => (
              <CharacterCard key={index} data={i} />
            ))}
      </div>

      <div className="flex justify-center mt-2 gap-3">
        {parseInt(page as string) > 1 && (
          <div>
            <Link href={`/?page=${parseInt(pageNumber as string) - 1}`}>
              <button>Prev page</button>
            </Link>
          </div>
        )}

        {router.pathname === "/" && pageNumber < lastPage && (
          <div>
            <Link href={`/?page=${parseInt(pageNumber as string) + 1}`}>
              <button>Next page</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayCharacterCards;
