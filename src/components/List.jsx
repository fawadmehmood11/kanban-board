import React from "react";
import { useState } from "react";
import "../styles/List.css";
import NewCardCreator from "./NewCardCreator";

const List = ({ list }) => {
  const [isAddingCard, setAddCard] = useState(false);

  const { id, tittle, cards } = list;

  const toggleCardCreator = () => {
    setAddCard(!isAddingCard);
  };

  return (
    <div className="listItem">
      <div className="lisTittle">{tittle}</div>

      {cards &&
        cards.map((card) => {
          console.log(card);
          return <div className="listCards">{card.cardContent}</div>;
        })}

      {isAddingCard ? (
        <NewCardCreator listId={id} toggleCardCreator={toggleCardCreator} />
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
