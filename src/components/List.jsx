import React from "react";
import { useState } from "react";
import "../styles/List.css";
import NewCardCreator from "./NewCardCreator";

const List = ({ list }) => {
  const [isAddingCard, setAddCard] = useState(false);

  const { id, tittle } = list;

  const toggleCardCreator = () => {
    setAddCard(!isAddingCard);
  };

  return (
    <div className="listItem">
      <div className="lisTittle">{tittle}</div>

      <div className="listCards">Card</div>

      {isAddingCard ? (
        <NewCardCreator toggleCardCreator={toggleCardCreator} />
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
