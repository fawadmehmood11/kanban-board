import React from "react";
import "../styles/NewListCreator.css";
import { useState } from "react";
import ActionBtns from "./ActionBtns";
import TextAreaComp from "./TextAreaComp";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addList } from "../features/ListSlice";

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
    <div className="ListCreator">
      <TextAreaComp
        value={listTittle}
        placeholderVal="Enter List Title"
        handleChange={handleChange}
        list={true}
      />

      <ActionBtns
        btnLabel="Add List"
        onCancel={toggleAddList}
        onSave={createList}
      />
    </div>
  );
};

export default NewListCreator;
