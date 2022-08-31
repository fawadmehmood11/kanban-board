import React from "react";
import { useState } from "react";
import AddNewList from "./AddNewList";

const Board = () => {
  const [isListAdding, setAddList] = useState(false);

  const addList = () => {
    console.log("clicked");
    setAddList(true);
  };

  return (
    <div className="addList">
      {isListAdding ? (
        <AddNewList />
      ) : (
        <button className="btn btnAddList" onClick={addList}>
          <i className="fa-light fa-plus"></i>
          Add a List
        </button>
      )}
    </div>
  );
};

export default Board;
