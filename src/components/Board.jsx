import React from "react";
import "../styles/Board.css";
import { useState, useRef } from "react";
import NewListCreator from "./NewListCreator";
import { getLists, moveList } from "../features/ListSlice";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import List from "./List";
import Creator from "./Creator";

const Board = () => {
  const [isListAdding, setAddList] = useState(false);
  const ref = useRef(null);

  const lists = useSelector(getLists);
  const toggleAddList = () => {
    setAddList(!isListAdding);
  };

  return (
    <>
      {/* {lists.length > 0 && ( */}
      <div className="list">
        {lists.map((list, index) => {
          return <List key={list.id} list={list} index={index} />;
        })}
        {/* )} */}
        <div className="addList">
          {isListAdding ? (
            // <NewListCreator toggleAddList={toggleAddList} />
            <Creator list={true} toggleCreator={toggleAddList} />
          ) : (
            <button className="btn btnAddList" onClick={toggleAddList}>
              <i className="fa-light fa-plus"></i>
              Add a List
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
