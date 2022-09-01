import React from "react";
import "../styles/NewListCreator.css";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ActionBtns from "./ActionBtns";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addList } from "../features/ListSlice";
import TextAreaComp from "./TextAreaComp";

const NewListCreator = ({ toggleAddList }) => {
  const [listTittle, setListTittle] = useState("");
  const dispatch = useDispatch();

  const createList = () => {
    toggleAddList();
    const id = nanoid();
    dispatch(addList(id, listTittle));
  };

  const handleChange = (e) => {
    setListTittle(e.target.value);
  };

  return (
    <div className="ListEditor">
      {/* <TextareaAutosize
        className="textArea"
        value={listTittle}
        placeholder="Enter List Title"
        onChange={(e) => setListTittle(e.target.value)}
      /> */}

      <TextAreaComp
        value={listTittle}
        placeholderVal="Enter List Title"
        handleChange={handleChange}
        list={true}
      />

      <ActionBtns
        btnLabel="Add List"
        toggleAddList={toggleAddList}
        createList={createList}
      />
    </div>
  );
};

export default NewListCreator;
