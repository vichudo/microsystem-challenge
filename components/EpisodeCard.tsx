import React, { FC, useState } from "react";
import { Episode } from "../types/main";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/episodesSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSelected } from "@heroicons/react/20/solid";
import { addToFavorites, removeFromFavorites } from "../slices/episodesSlice";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const CharacterCard: FC<{ data: Episode }> = ({ data }) => {
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
    <>
      <Toaster />

      <div className="bg-green-700 rounded-md h-fit w-48 p-2 flex gap-2 text-white font-bold">
        {" "}
        <button onClick={() => addItemToFavorites(data)}>
          {isFav ? (
            <HeartSelected className="w-4" />
          ) : (
            <HeartIcon className="w-4 " />
          )}
        </button>
        <Link href={`/episode/${data.id}`}>{data?.name}</Link>
      </div>
    </>
  );
};

export default CharacterCard;
