import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  lists: [
    {
      id: "List1",
      tittle: "List 1",
      listCards: ["card1", "card2"],
    },
    {
      id: "List2",
      tittle: "List 2",
      listCards: ["card3", "card4"],
    },
  ],

  cards: [
    {
      cardId: "card1",
      cardContent: "Wireframe Landing Page",
    },

    {
      cardId: "card2",
      cardContent: "Write Blog post",
    },
    {
      cardId: "card3",
      cardContent: "Build Checkout Page",
    },
    {
      cardId: "card4",
      cardContent: "Revamp login page",
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

    addCard: {
      reducer: (state, action) => {
        state.cards.push(action.payload.cardData);
        const relevantList = state.lists.find((list) => {
          return list.id === action.payload.listId;
        });
        relevantList.listCards.push(action.payload.cardData.cardId);
      },
      prepare(listId, cardId, cardContent) {
        return {
          payload: {
            listId,
            cardData: { cardId, cardContent },
          },
        };
      },
    },

    updateCardContent: (state, action) => {
      const cardList = state.cards.find((card) => {
        return card.cardId === action.payload.cardId;
      });
      cardList.cardContent = action.payload.cardContent;
    },

    moveCard: (state, action) => {
      const { cardId, dropIndex, itemIndex, currentList, hoveredList } =
        action.payload;
      console.log(action.payload);
      const relevantList = state.lists.find((list) => {
        return list.id === currentList;
      });
      if (currentList === hoveredList) {
        relevantList.listCards.splice(itemIndex, 1);
        relevantList.listCards.splice(dropIndex, 0, cardId);
      } else {
        const draggedCard = relevantList.listCards.splice(itemIndex, 1);
        const filterList = state.lists.find((list) => {
          return list.id === action.payload.hoveredList;
        });
        filterList.listCards.splice(dropIndex, 0, cardId);
      }
    },

    moveList: (state, action) => {
      // console.log(action.payload);
      const { listId, dropIndex, itemIndex } = action.payload;

      const draggedItem = state.lists[itemIndex];
      // console.log("Dragged Item", draggedItem);
      state.lists.splice(itemIndex, 1);
      state.lists.splice(dropIndex, 0, draggedItem);
      // console.log(current(state));
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
export const {
  addList,
  addCard,
  updateListTitle,
  updateCardContent,
  moveCard,
  moveList,
} = listSlice.actions;

export default listSlice.reducer;
