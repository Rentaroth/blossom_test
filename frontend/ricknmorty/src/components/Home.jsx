import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  queryCharacters,
  searchQuery,
  selectCard,
  setSearchValue,
} from "../store/slices/characterSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchValue = useSelector((state) => {
    state.character.searchValue;
  });
  const selectedCard = useSelector(state => state.character.selectedCard);
  const characters = useSelector((state) => state.character.characters);

  function typing(event) {
    dispatch(setSearchValue(event.target.value));
    dispatch(searchQuery());
  }

  function selectCharacter(id) {
    dispatch(selectCard(id));
    navigate('/card');
  }

  useEffect(() => {
    dispatch(queryCharacters());
  }, []);

  const char =
    characters &&
    Array.isArray(characters) &&
    characters.map((element) => {
      if (!element.favorite) {
        return (
          <div
            key={element.id}
            onClick={() => {selectCharacter(element.id)}}
            className=" w-full py-4 border-t-[1px] relative flex items-center"
          >
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={element.image}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div className=" text-darkFont font-semibold">{element.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {element.species}
              </div>
            </div>
            {!element.favorite && (
              <img
                className=" w-[24px] h-[24px] absolute rounded-full self-center right-1"
                src="src/assets/greyHeart.svg"
                alt=""
              />
            )}
          </div>
        );
      }
    });
  const favoriteChar =
    characters &&
    Array.isArray(characters) &&
    characters.map((element) => {
      if (element.favorite) {
        return (
          <div
            key={element.id}
            className=" w-full py-4 border-t-[1px] relative flex items-center"
          >
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={element.image}
              alt=""
            />
            <div className="font-medium dark:text-white">
              <div className=" text-darkFont font-semibold">{element.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {element.species}
              </div>
            </div>
            {element.favorite && (
              <img
                className=" w-[24px] h-[24px] absolute rounded-full self-center right-1"
                src="src/assets/heart.svg"
                alt=""
              />
            )}
          </div>
        );
      }
    });

  return (
    <section className=" w-full h-full">
      <header className=" w-full h-[12vh] pl-[24px] mb-[15px] bg-whiteBg flex justify-start items-end">
        <h1 className=" text-darkFont text-[24px] font-bold font-greycliff">
          Rick and Morty list
        </h1>
      </header>
      <main className=" w-full h-[6vh] px-8 bg-whiteBg flex justify-center items-center">
        <div className=" w-full h-[80%] px bg-lightGray flex justify-evenly items-center rounded-md">
          {/* <label className="" htmlFor="search"></label> */}
          <img src="src/assets/Search_New.svg" alt=""></img>
          <input
            value={searchValue}
            onChange={(event) => {
              typing(event);
            }}
            className=" bg-transparent h-full p-2 placeholder:font-greycliff placeholder:font-medium placeholder:text-[16px] text-lightFont placeholder:text-lightFont focus:outline-none focus:placeholder-transparent cursor-text"
            id="search"
            type="text"
            placeholder="Search or filter results"
          />
          <img src="src/assets/filter_button.svg" alt=""></img>
        </div>
      </main>
      <section className=" w-full h-[82vh] px-8 pt-[15px] bg-whiteBg text-lightFont font-700 overflow-y-auto overscroll-y-auto hide_scrollbar">
        <div className=" mb-4">
          <div className=" my-6">
            <h2 className=" text-[12px]">STARRED CHARACTERS (N°)</h2>
          </div>
          <div className=" h-fit">{favoriteChar}</div>
        </div>
        <div className=" h-fit">
          <div className="">
            <h2 className=" text-[12px]">CHARACTERS (N°)</h2>
          </div>
          <div className=" h-full mb-2">{char}</div>
        </div>
      </section>
    </section>
  );
}

export { Home };
