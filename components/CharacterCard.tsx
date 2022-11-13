import React, { FC, useState } from "react";
import { Character } from "../types/main";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/favSlice";
import { addToFavorites } from "../slices/favSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSelected } from "@heroicons/react/20/solid";
import { removeFromFavorites } from "../slices/favSlice";
import { Toaster, toast } from "react-hot-toast";

const CharacterCard: FC<{ data: Character }> = ({ data }) => {
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
      <div className="bg-indigo-500 rounded-md h-fit w-48 p-2 flex gap-2 text-white font-bold">
        {" "}
        <button onClick={() => addItemToFavorites(data)}>
          {isFav ? (
            <HeartSelected className="w-4" />
          ) : (
            <HeartIcon className="w-4 " />
          )}
        </button>
        {data?.name}
      </div>
    </>
  );
};

export default CharacterCard;
