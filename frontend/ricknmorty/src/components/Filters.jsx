import { useDispatch, useSelector } from "react-redux";
import {
  alternateFilterMenu,
  deleteFilters,
  filterCharacters,
  filterSelection,
} from "../store/slices/characterSlice";
import { useEffect } from "react";

function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.character.filters);

  function closeFilters() {
    dispatch(alternateFilterMenu());
  }

  function storeFilters(values) {
    dispatch(filterSelection(values));
  }

  useEffect(() => {
    dispatch(filterCharacters())
  }, [filters])

  return (
    <section onMouseLeave={()=> {closeFilters()}} className={`w-[100vw] h-[100vh] laptop:absolute laptop:w-[30vw] laptop:h-[40vw] laptop:top-[155px] laptop:left-[300px] laptop:rounded-xl laptop:border-[1px] bg-whiteBg laptop:z-40 z-20`}>
      <div className=" w-full pt-6 flex justify-center">
        <button
          onClick={() => {
            closeFilters();
          }}
          className=" fixed left-6 top-6"
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
        <h1 className=" text-darkFont font-greycliff font-semibold">Filters</h1>
      </div>
      <div className=" w-full h-fit mt-16">
        <h2 className=" text-lightFont font-medium ml-6 mb-6">Specie</h2>
        <div className=" w-full h-[10%] px-6 flex justify-between">
          <div
            onClick={() => {
              dispatch(deleteFilters('specie'))
            }}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">All</h2>
          </div>
          <div
            onClick={() => {storeFilters({specie: 'Alien'})}}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">Alien</h2>
          </div>
          <div
            onClick={() => {storeFilters({specie:'Human'})}}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">Human</h2>
          </div>
        </div>
      </div>
      <div className=" w-full h-fit mt-8">
        <h2 className=" text-lightFont font-medium ml-6 mb-6">Gender</h2>
        <div className=" w-full h-[10%] px-6 flex justify-between">
          <div
            onClick={() => {dispatch(deleteFilters('gender'))}}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">All</h2>
          </div>
          <div
            onClick={() => {storeFilters({gender:'Male'})}}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">Male</h2>
          </div>
          <div
            onClick={() => {storeFilters({gender:'Female'})}}
            className=" w-[25vw] h-[6vh] flex justify-center items-center border-[1px] shadow-sm rounded-xl bg-whiteBg cursor-pointer"
          >
            <h2 className=" text-darkFont font-greycliff">Female</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Filters };
