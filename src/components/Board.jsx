import React from "react";
import "../styles/Board.css";
import { useState } from "react";
import NewListCreator from "./NewListCreator";
import { getLists } from "../features/ListSlice";
import { useSelector } from "react-redux";
import List from "./List";

const Board = () => {
  const [isListAdding, setAddList] = useState(false);

  const lists = useSelector(getLists);
  // console.log(lists);
  const toggleAddList = () => {
    setAddList(!isListAdding);
  };

  return (
    <>
      {/* {lists.length > 0 && ( */}
      <div className="list">
        {lists.map((list) => {
          return <List key={list.id} list={list} />;
        })}
        {/* )} */}
        <div className="addList">
          {isListAdding ? (
            <NewListCreator toggleAddList={toggleAddList} />
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
