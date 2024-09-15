import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const queryCharacters = createAsyncThunk(
  "queryCharacters",
  async (info, api) => {
    const order = info || 'ASC';
    try {
      const query = await fetch(`${backend_url}characters`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            getCharacters(order: "${order}") {
              id
              name
              species
              image
              favorite
            }
          }`
        }),
      });
      const result = await query.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

const searchQuery = createAsyncThunk(
  "searchQuery",
  async (info, api) => {
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

const initialState = {
  characters: {},
  searchValue: '',
  selectedCard: '',
};

const characterReducer = createSlice({
  name: "character",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    selectCard: (state, action) => {
      const char = state.characters 
      const card = char.find(element => element.id === action.payload);
      sessionStorage.setItem('card', JSON.stringify(card));
      state.selectedCard = card;
    },
    readCard: (state, action) => {
      const card = sessionStorage.getItem('card');
      state.selectedCard = JSON.parse(card);
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(queryCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.data.getCharacters;
    });
    addCase(searchQuery.fulfilled, (state, action) => {
      state.characters = action.payload.data.searchQuery;
    });
  },
});

export { queryCharacters, searchQuery };

export const { setSearchValue, selectCard, readCard } = characterReducer.actions;

export default characterReducer.reducer;
