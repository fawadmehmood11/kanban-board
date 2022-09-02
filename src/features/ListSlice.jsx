import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    {
      id: "u_9venLrZygChUgTF4VDT",
      tittle: "List 1",
      listCards: ["uqwTDxPowfAnWTy4hgH_Q", "uqwTDxPowfAnWTy4hasH_Q"],
    },
    {
      id: "voOJ6q7BShzdQeKCjhhWz",
      tittle: "List 2",
      listCards: ["eC9ahZyVmA1qnxxOffQcd"],
    },
  ],

  cards: [
    {
      cardId: "uqwTDxPowfAnWTy4hgH_Q",
      cardContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },

    {
      cardId: "uqwTDxPowfAnWTy4hasH_Q",
      cardContent: "ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      cardId: "eC9ahZyVmA1qnxxOffQcd",
      cardContent:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
    },
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
            listCards: [],
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
      // console.log(action.payload);
      // const relevantList = state.lists.find((list) => {
      //   return list.id === action.payload.listId;
      // });
      // if (relevantList.hasOwnProperty("cards")) {
      //   relevantList.cards.push(action.payload);
      // } else {
      //   const irrelevantList = state.lists.filter((list) => {
      //     return list.id !== action.payload.listId;
      //   });
      //   relevantList.cards = [action.payload];
      //   state.lists = [...irrelevantList, relevantList];
      // }
    },
  },
});

export const getLists = (state) => state.lists.lists;
export const getCards = (state) => state.lists.cards;

export const selectCardById = (state, cardsIdList) => {
  const cr = cardsIdList.map((cardIds) => {
    return state.lists.cards.filter((card) => {
      return card.cardId === cardIds;
    });
  });
  return cr;
};
export const { addList, addCard, updateListTitle } = listSlice.actions;

export default listSlice.reducer;
