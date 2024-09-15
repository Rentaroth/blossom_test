import { useDispatch, useSelector } from "react-redux";
import { favoriteQuery, goBack, readCard } from "../store/slices/characterSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCard = useSelector((state) => state.character.selectedCard);

  useEffect(() => {
    dispatch(readCard());

    if (!selectedCard) {
      navigate("/");
    }
  }, []);

  function back() {
    dispatch(goBack());
  }
  function favoriteOneCharacter(id) {
    dispatch(favoriteQuery({
      operation: 'favorite',
      id,
    }));
  }
  function unfavoriteOneCharacter(id) {
    dispatch(favoriteQuery({
      operation: 'unfavorite',
      id,
    }));
  }

  return (
    selectedCard && (
      <>
        <div
          key={selectedCard.id}
          className={
            " w-[100vw] h-[100vh] laptop:w-[60%] laptopL:w-[70%] bg-whiteBg py-4 px-6 laptop:pl-32 border-t-[1px] flex flex-col justify-start z-30"
          }
        >
            <button
              onClick={() => {
                back();
              }}
              className=" laptop:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 19L3 12M3 12L10 5M3 12L21 12"
                  stroke="#8054C7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          <div className=" relative">
            <img
              className="w-[10vh] h-[10vh] my-8 top-0 rounded-full"
              src={selectedCard.image}
              alt=""
            />
            {!selectedCard.favorite ?
            <div className="w-[30px] h-[30px] absolute left-[50px] bottom-[25px] rounded-[50%] flex justify-center items-center bg-whiteBg">
              <button onClick={()=>{favoriteOneCharacter(selectedCard.id)}}>
                <img
                  className=" w-[24px] h-[24px] rounded-full self-center bg-whiteBg"
                  src="src/assets/greyHeart.svg"
                  alt=""
                />
              </button>
            </div>
            :<div className="w-[30px] h-[30px] absolute left-[50px] bottom-[25px] rounded-[50%] flex justify-center items-center bg-whiteBg">
              <button onClick={()=> {unfavoriteOneCharacter(selectedCard.id)}}>
                <img
                  className=" w-[24px] h-[24px] rounded-full self-center bg-whiteBg"
                  src="src/assets/heart.svg"
                  alt=""
                />
              </button>
            </div>
          }
          </div>
          <div className=" w-full h-full font-medium dark:text-white">
            <div className=" w-full text-darkFont font-semibold text-[24px]">
              {selectedCard.name}
            </div>
            <div
              className=" w-full py-4 relative flex items-center"
            >
              <div className="font-medium dark:text-white">
                <div className=" text-darkFont font-semibold">
                  Specie
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCard.species}
                </div>
              </div>
            </div>
            <div
              className=" w-full py-4 border-t-[1px] relative flex items-center"
            >
              <div className="font-medium dark:text-white">
                <div className=" text-darkFont font-semibold">
                  Status
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCard.status}
                </div>
              </div>
            </div>
            <div
              className=" w-full py-4 border-t-[1px] relative flex items-center"
            >
              <div className="font-medium dark:text-white">
                <div className=" text-darkFont font-semibold">
                  Gender
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedCard.gender}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export { Card };
