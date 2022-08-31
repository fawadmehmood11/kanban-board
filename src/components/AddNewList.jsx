import React from "react";
import "../styles/AddNewList.css";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ActionBtns from "./ActionBtns";

const AddNewList = ({ toggleAddList }) => {
  const [listTittle, setListTittle] = useState("");
  return (
    <div className="AddListEditor">
      <TextareaAutosize
        className="textArea"
        value={listTittle}
        placeholder="Enter List Title"
        onChange={(e) => setListTittle(e.target.value)}
      />

      <ActionBtns btnLabel="Add List" toggleAddList={toggleAddList} />
    </div>
  );
};

export default AddNewList;
