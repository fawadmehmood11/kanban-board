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
        console.log(action.payload);
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
  },
});

export const getLists = (state) => state.lists.lists;

export const { addList } = listSlice.actions;

export default listSlice.reducer;
