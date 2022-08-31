import React from "react";
import "../styles/Board.css";
import { useState } from "react";
import AddNewList from "./AddNewList";

const Board = () => {
  const [isListAdding, setAddList] = useState(false);

  const toggleAddList = () => {
    console.log("clicked");
    setAddList(!isListAdding);
  };

  return (
    <div className="addList">
      {isListAdding ? (
        <AddNewList toggleAddList={toggleAddList} />
      ) : (
        <button className="btn btnAddList" onClick={toggleAddList}>
          <i className="fa-light fa-plus"></i>
          Add a List
        </button>
      )}
    </div>
  );
};

export default Board;
