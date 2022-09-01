import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    { id: "u_9venLrZygChUgTF4VDT", tittle: "List 1" },
    { id: "voOJ6q7BShzdQeKCjhhWz", tittle: "List 2" },
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

    updateListTitle: {
      reducer: (state, action) => {
        const relevantList = state.lists.find(
          (list) => list.id === action.payload.id
        );
        relevantList.tittle = action.payload.tittle;
      },
      prepare(id, newTittle) {
        return {
          payload: {
            id,
            tittle: newTittle,
          },
        };
      },
    },

    addCard: (state, action) => {
      const relevantList = state.lists.find((list) => {
        return list.id === action.payload.listId;
      });

      if (relevantList.hasOwnProperty("cards")) {
        relevantList.cards.push(action.payload);
      } else {
        const irrelevantList = state.lists.filter((list) => {
          return list.id !== action.payload.listId;
        });
        relevantList.cards = [action.payload];
        state.lists = [...irrelevantList, relevantList];
      }
    },
  },
});

export const getLists = (state) => state.lists.lists;

export const { addList, addCard, updateListTitle } = listSlice.actions;

export default listSlice.reducer;
