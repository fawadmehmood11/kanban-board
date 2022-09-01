import React from "react";
import { useState } from "react";
import "../styles/List.css";
import NewCardCreator from "./NewCardCreator";
import Creator from "./Creator";
import Editor from "./Editor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateListTitle } from "../features/ListSlice";

const List = ({ list }) => {
  const [isAddingCard, setAddCard] = useState(false);
  const [newTittle, setNewTitle] = useState("");
  const [isEditingTitle, setisEditingTitle] = useState(false);
  const { id, tittle, cards } = list;
  const dispatch = useDispatch();

  useEffect(() => {
    if (tittle) setNewTitle(tittle);
  }, [tittle]);

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
    // e.preventDefault();
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
        <div className="lisTittle" onClick={toggleTitleEditing}>
          {tittle}
        </div>
      )}

      {cards &&
        cards.map((card) => {
          return <div className="listCards">{card.cardContent}</div>;
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

export default List;
