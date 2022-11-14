import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React from "react";
import Image from "next/image";
import { Character, Episode } from "../../types/main";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../slices/favSlice";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSelected } from "@heroicons/react/20/solid";
import { toast, Toaster } from "react-hot-toast";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../slices/episodesSlice";

const Index: NextPage<{ data: Episode; characters?: string[] }> = ({
  data,
  characters,
}) => {
  const dispatch = useDispatch();
  const favs = useSelector(selectItems);

  const [isFav, setFav] = useState<boolean>(
    favs.some(({ name }: any) => name === data.name)
  );

  const addItemToFavorites = (favObj: object) => {
    if (isFav) {
      setFav(false);
      toast.error("Removed From Favorites", {
        style: { boxShadow: "none", color: "white", backgroundColor: "red" },
      });
      dispatch(removeFromFavorites(favObj));
    } else {
      setFav(true);
      toast.success("Added To Favorites", {
        style: { boxShadow: "none", color: "white", backgroundColor: "green" },
      });
      dispatch(addToFavorites(favObj));
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <Toaster />
      <div className="flex flex-col w-96 justify-center items-center bg-green-700 mt-6 rounded-md p-4">
        <div className="w-max my-0">
          <button
            className="relative right-40 "
            onClick={() => addItemToFavorites(data)}
          >
            {isFav ? (
              <HeartSelected className="w-8 text-white" />
            ) : (
              <HeartIcon className="w-8 text-white " />
            )}
          </button>
        </div>
        <div>
          <h1 className="mt-5 bg-black px-3 py-1 text-center  text-gray-50 rounded-md mb-5 font-bold text-2xl">
            {data?.name}
          </h1>
          <ul className="text-white p-3 flex flex-col gap-2 bg0">
            <li>
              <span className="font-bold">ID :</span> {data.id}
            </li>
            <li>
              <span className="font-bold">Air Date:</span>{" "}
              {data?.air_date || "unknown"}
            </li>
            <li>
              <span className="font-bold">Episode:</span>{" "}
              {data.episode || "unknown"}
            </li>
            {/* <li className="bg-black rounded-md  p-2">
              <span className="font-bold">Characters:</span>{" "}
              {characters.join(", ") || "unknown"}
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(
    `https://rickandmortyapi.com/api/episode/${params?.id}`
  ).then((res) => res.json());

  // const characters = await Promise.all(
  //   data?.characters.map(async (i: string) => {
  //     return await fetch(i).then((res) => res.json());
  //   })
  // );
  // characters: characters.map(({ name }) => name)
  return {
    props: {
      data: data,
      /* characters: characters.map(({ name }) => name) */
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch("https://rickandmortyapi.com/api/episode").then(
    (res) => res.json()
  );

  const pages = await data.info?.pages;
  let pagesArray = [];

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  const data_ = await Promise.all(
    pagesArray.map(
      async (i: number) =>
        await fetch(`https://rickandmortyapi.com/api/episode?page=${i}`).then(
          (res) => res.json()
        )
    )
  );

  const final_data = { ...data_.map(({ results }) => [...results]) };

  const paths = Object.values(final_data)
    .flat()
    .map(({ id }) => ({ params: { id: `${id}` } }));

  return {
    paths,
    fallback: true,
  };
};

export default Index;