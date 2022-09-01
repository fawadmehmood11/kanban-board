import React from "react";
import { useState } from "react";
import "../styles/List.css";
import NewCardCreator from "./NewCardCreator";
import Creator from "./Creator";

const List = ({ list }) => {
  const [isAddingCard, setAddCard] = useState(false);
  const [isEditingTitle, setNewTitle] = useState(false);

  const { id, tittle, cards } = list;

  const toggleCardCreator = () => {
    setAddCard(!isAddingCard);
  };

  const toggleTitleEditing = () => {
    setNewTitle(!isEditingTitle);
  };

  return (
    <div className="listItem">
      <div className="lisTittle" onClick={toggleTitleEditing}>
        {tittle}
      </div>

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
