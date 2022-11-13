import React, { useEffect, useState } from "react";
import { DisplayCharactersType } from "../types/main";
import CharacterCard from "./CharacterCard";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";

const DisplayCharacterCards: FC<DisplayCharactersType> = ({ data, search }) => {
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
              .map((i, index) => <CharacterCard key={index} data={i} />)
          : data[parseInt(pageNumber as string) - 1].map((i) => (
              <CharacterCard key={i.id} data={i} />
            ))}
      </div>

      <div className="flex justify-center mt-2 gap-3">
        {parseInt(page as string) > 1 && (
          <div className="mt-5">
            <Link href={`/?page=${parseInt(pageNumber as string) - 1}`}>
              <button className="text-sm">Prev page</button>
            </Link>
          </div>
        )}

        {router.pathname === "/" && pageNumber < lastPage && (
          <div className="mt-5">
            <Link href={`/?page=${parseInt(pageNumber as string) + 1}`}>
              <button className="text-sm">Next page</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayCharacterCards;
