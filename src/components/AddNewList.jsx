import React from "react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const AddNewList = () => {
  const [listTittle, setListTittle] = useState("");
  return (
    <div>
      <TextareaAutosize
        className="textArea"
        value={listTittle}
        onChange={(e) => setListTittle(e.target.value)}
      />

      <div className="btn btnActions">
        <button>Add List</button>
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

export default AddNewList;
