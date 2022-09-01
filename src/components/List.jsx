import React from "react";
import "../styles/List.css";

const List = ({ list }) => {
  const { tittle } = list;

  const addCard = () => {
    console.log("addCard");
  };

  return (
    <div className="listItem">
      <div className="lisTittle">{tittle}</div>

      <div className="listCards">Card</div>

      <button className="btn btnAddList cardBtn" onClick={addCard}>
        <i className="fa-light fa-plus"></i>
        Card
      </button>
    </div>
  );
};

export default List;
