import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Image from "next/image";
import { Character } from "../../types/main";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../slices/favSlice";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSelected } from "@heroicons/react/20/solid";
import { toast, Toaster } from "react-hot-toast";
import {
  addCharacterToFavorites,
  removeCharacterFromFavorites,
} from "../../slices/favSlice";

const Index: NextPage<{ data: Character; episodes?: string[] }> = ({
  data,
  episodes,
}) => {
  const dispatch = useDispatch();
  const favs = useSelector(selectItems);

  const [isFav, setFav] = useState<boolean>(
    favs.some(({ name, id }: Character) => name === data.name && id)
  );

  const addItemToFavorites = (favObj: Character) => {
    if (isFav) {
      setFav(false);
      toast.error("Removed From Favorites", {
        style: { boxShadow: "none", color: "white", backgroundColor: "red" },
      });
      dispatch(removeCharacterFromFavorites(favObj));
    } else {
      setFav(true);
      toast.success("Added To Favorites", {
        style: { boxShadow: "none", color: "white", backgroundColor: "green" },
      });
      dispatch(addCharacterToFavorites(favObj));
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <Toaster />
      <div className="flex flex-col w-96 justify-center items-center bg-indigo-600 mt-6 rounded-md p-4">
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
        <Image
          className="rounded-full mt-2 shadow-indigo-900 shadow-sm"
          src={data.image}
          width={100}
          height={100}
          alt={data.name}
        />
        <div>
          <h1 className="mt-5 bg-black px-3 py-1 text-center  text-gray-50 rounded-md mb-5 font-bold text-4xl">
            {data?.name}
          </h1>
          <ul className="text-white p-3">
            <li>
              <span className="font-bold">ID :</span> {data.id}
            </li>
            <li>
              <span className="font-bold">Status :</span>{" "}
              {data.status || "unknown"}
            </li>
            <li>
              <span className="font-bold">Species :</span>{" "}
              {data.species || "unknown"}
            </li>
            <li>
              <span className="font-bold">Type :</span> {data.type || "unknown"}
            </li>
            <li>
              <span className="font-bold">Gender :</span>{" "}
              {data.gender || "unknown"}
            </li>
            <li>
              <span className="font-bold">Origin :</span>{" "}
              {data.origin.name || "unknown"}
            </li>
            <li>
              <span className="font-bold">Location :</span>{" "}
              {data.location.name || "unknown"}
            </li>
            <li className="bg-indigo-900 rounded-md overflow-auto h-fit max-h-64 mt-2 p-2">
              <span className="font-bold overflow-auto">Episodes:</span>{" "}
              {episodes?.join(", ")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=259200, stale-while-revalidate=432000"
  );
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/${params?.id}`
  ).then((res) => res.json());

  const episodes = await Promise.all(
    data?.episode?.map(async (i: string) => {
      return await fetch(i).then((res) => res.json());
    })
  );

  return {
    props: {
      data: data,
      episodes: episodes?.map(({ name }) => name),
    },
  };
};

export default Index;
