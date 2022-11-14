import React, { FC, useState } from "react";
import { Character, Episode } from "../types/main";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/favSlice";
import {
  addCharacterToFavorites,
  removeCharacterFromFavorites,
} from "../slices/favSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSelected } from "@heroicons/react/20/solid";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

const CharacterCard: FC<{ data: Character }> = ({ data }) => {
  const dispatch = useDispatch();
  const favs = useSelector(selectItems);

  const [isFav, setFav] = useState<boolean>(
    favs.some(({ name }: Episode) => name === data.name)
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
    <>
      <Toaster />

      <div className="bg-indigo-500 rounded-md h-fit w-48 p-2 flex gap-2 text-white font-bold">
        {" "}
        <button onClick={() => addItemToFavorites(data)}>
          {isFav ? (
            <HeartSelected className="w-4" />
          ) : (
            <HeartIcon className="w-4 " />
          )}
        </button>
        <Link href={`/character/${data.id}`}>{data?.name}</Link>
      </div>
    </>
  );
};

export default CharacterCard;
