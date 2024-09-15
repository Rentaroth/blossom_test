import { useDispatch, useSelector } from "react-redux";
import { readCard } from "../store/slices/characterSlice";
import { useEffect } from "react";

function Card() {
  const dispatch = useDispatch();
  const selectedCard = useSelector((state) => state.character.selectedCard);

  useEffect(() => {
    dispatch(readCard());
  }, []);

  return (
    selectedCard && (
      <>
        <div
          key={selectedCard.id}
          className=" w-full py-4 border-t-[1px] relative flex items-center"
        >
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={selectedCard.image}
            alt=""
          />
          <div className="font-medium dark:text-white">
            <div className=" text-darkFont font-semibold">
              {selectedCard.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCard.species}
            </div>
          </div>
          {!selectedCard.favorite && (
            <img
              className=" w-[24px] h-[24px] absolute rounded-full self-center right-1"
              src="src/assets/greyHeart.svg"
              alt=""
            />
          )}
        </div>
      </>
    )
  );
}

export { Card };
