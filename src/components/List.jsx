import React from "react";
import "../styles/List.css";

const List = ({ list }) => {
  const { id, tittle } = list;

  return (
    <div className="listItem">
      <div className="lisTittle">{tittle}</div>

      <div className="listCards">Card</div>

      <button className="btn btnAddList cardBtn">
        <i className="fa-light fa-plus"></i>
        Card
      </button>
    </div>
  );
};

export default List;
