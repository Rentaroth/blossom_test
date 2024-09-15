import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const queryCharacters = createAsyncThunk(
  "queryCharacters",
  async (info, api) => {
    const order = info || "ASC";
    try {
      const query = await fetch(`${backend_url}characters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{
            getCharacters(order: "${order}") {
              id
              name
              species
              status
              gender
              image
              favorite
            }
          }`,
        }),
      });
      const result = await query.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

const searchQuery = createAsyncThunk("searchQuery", async (info, api) => {
  const keyword = api.getState().character.searchValue;
  try {
    const query = await fetch(`${backend_url}characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
            searchQuery(keyword:"${keyword}") {
              id
              name
              species
              status
              gender
              image
              favorite
            }
          }`,
      }),
    });
    const result = await query.json();
    return result;
  } catch (error) {
    console.error(error);
  }
});

const filterCharacters = createAsyncThunk(
  "filterCharacters",
  async (info, api) => {
    try {
      const filters = api.getState().character.filters;
      let queryValues = "";
      if (filters.specie) {
        queryValues = queryValues + `species:"${filters.specie}"`;
      }
      if (filters.gender) {
        queryValues = queryValues + `gender:"${filters.gender}"`;
      }
      if (!filters.gender && !filters.specie) {
        queryValues = false;
        api.dispatch(queryCharacters());
      }
      if (queryValues) {
        const query = await fetch(`${backend_url}characters`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{
              getCharactersFiltered(${queryValues}) {
                id
                name
                species
                status
                gender
                image
                favorite
              }
            }`,
          }),
        });
        const result = await query.json();
        return result;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }
);

const favoriteQuery = createAsyncThunk("favoriteQuery", async (info, api) => {
  let queryString = "";
  if (info.operation === "favorite") {
    queryString = {
      query: `mutation {
          favoriteOne(id:${info.id}) {
            id
            name
            species
            status
            gender
            image
            favorite
          }	
        }`,
    };
    try {
      const query = await fetch(`${backend_url}characters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryString),
      });
      const result = await query.json();
      return result.data.favoriteOne;
    } catch (error) {
      console.error(error);
    }
  }
  if (info.operation === "unfavorite") {
    queryString = {
      query: `mutation {
          unfavoriteOne(id:${info.id}) {
            id
            name
            species
            status
            gender
            image
            favorite
          }	
        }`,
    };
    try {
      const query = await fetch(`${backend_url}characters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryString),
      });
      const result = await query.json();
      return result.data.unfavoriteOne;
    } catch (error) {
      console.error(error);
    }
  }
});

const initialState = {
  characters: {},
  searchValue: "",
  selectedCard: "",
  filterMenu: false,
  filters: {
    specie: "",
    gender: "",
  },
};

const characterReducer = createSlice({
  name: "character",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    selectCard: (state, action) => {
      const char = state.characters;
      const card = char.find((element) => element.id === action.payload);
      sessionStorage.setItem("card", JSON.stringify(card));
      state.selectedCard = card;
    },
    readCard: (state, action) => {
      const card = sessionStorage.getItem("card");
      state.selectedCard = JSON.parse(card);
    },
    goBack: (state, action) => {
      sessionStorage.removeItem("card");
      location.reload();
    },
    alternateFilterMenu: (state, action) => {
      if (state.filterMenu) {
        state.filterMenu = false;
      } else {
        state.filterMenu = true;
      }
    },
    filterSelection: (state, action) => {
      state.filters = {
        specie: action.payload.specie || state.filters.specie,
        gender: action.payload.gender || state.filters.gender,
      };
    },
    deleteFilters: (state, action) => {
      if (action.payload === "specie") {
        state.filters.specie = "";
      } else if (action.payload === "gender") {
        state.filters.gender = "";
      }
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(queryCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.data.getCharacters;
    });
    addCase(searchQuery.fulfilled, (state, action) => {
      state.characters = action.payload.data.searchQuery;
    });
    addCase(filterCharacters.fulfilled, (state, action) => {
      if (action.payload) {
        state.characters = action.payload.data.getCharactersFiltered;
      }
    });
    addCase(favoriteQuery.fulfilled, (state, action) => {
      const index = state.characters.findIndex(
        (element) => element.id === action.payload.id
      );
      state.characters[index] = action.payload;
      state.selectedCard = action.payload;
      sessionStorage.setItem('card', action.payload);
    });
  },
});

export { queryCharacters, searchQuery, filterCharacters, favoriteQuery };

export const {
  setSearchValue,
  selectCard,
  readCard,
  goBack,
  alternateFilterMenu,
  filterSelection,
  deleteFilters,
} = characterReducer.actions;

export default characterReducer.reducer;
