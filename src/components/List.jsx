import React from "react";
import { useState } from "react";
import "../styles/List.css";
import NewCardCreator from "./NewCardCreator";
import Creator from "./Creator";
import Editor from "./Editor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateListTitle,
  getCards,
  selectCardById,
} from "../features/ListSlice";
import { useSelector } from "react-redux";
import Card from "./Card";

const List = ({ list }) => {
  const [isAddingCard, setAddCard] = useState(false);
  const [isEditingTitle, setisEditingTitle] = useState(false);
  const { id, tittle, listCards } = list;
  const [newTittle, setNewTitle] = useState(tittle);

  const dispatch = useDispatch();
  const cards = useSelector((state) => selectCardById(state, listCards));

  const toggleCardCreator = () => {
    setAddCard(!isAddingCard);
  };

  const toggleTitleEditing = () => {
    setisEditingTitle(!isEditingTitle);
  };

  const handleTittleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const updateTitle = (e) => {
    if (e.keyCode === 13) {
      dispatch(updateListTitle(id, newTittle));
      toggleTitleEditing();
    }
  };

  return (
    <div className="listItem">
      {isEditingTitle ? (
        <Editor
          tittle={newTittle}
          handleChange={handleTittleChange}
          updateTitle={updateTitle}
          list={true}
        />
      ) : (
        <div className="listTittle" onClick={toggleTitleEditing}>
          {tittle}
        </div>
      )}

      {cards &&
        cards.map((card) => {
          return (
            <Card key={card[0].cardId} cardContent={card[0].cardContent} />
            // return <div className="listCards">{card.cardContent}</div>;
          );
        })}

      {isAddingCard ? (
        // <NewCardCreator listId={id} toggleCardCreator={toggleCardCreator} />
        <Creator listId={id} toggleCreator={toggleCardCreator} />
      ) : (
        <button className="btn btnAddList cardBtn" onClick={toggleCardCreator}>
          <i className="fa-light fa-plus"></i>
          Card
        </button>
      )}
    </div>
  );
};

export default React.memo(List);
