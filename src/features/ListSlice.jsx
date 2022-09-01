import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    { id: "u_9venLrZygChUgTF4VDT", tittle: "Card 1" },
    { id: "voOJ6q7BShzdQeKCjhhWz", tittle: "Card 2" },
  ],
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    // addList: (state, action) => {
    //   console.log(action.payload);
    //   state.lists.push(action.payload);
    // },

    addList: {
      reducer: (state, action) => {
        state.lists.push(action.payload);
      },
      prepare(id, listTittle) {
        return {
          payload: {
            id,
            tittle: listTittle,
          },
        };
      },
    },

    addCard: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const getLists = (state) => state.lists.lists;

export const { addList, addCard } = listSlice.actions;

export default listSlice.reducer;
