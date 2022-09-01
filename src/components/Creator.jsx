import React from "react";
import { useState } from "react";
import ActionBtns from "./ActionBtns";
import TextAreaComp from "./TextAreaComp";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addList } from "../features/ListSlice";
import { addCard } from "../features/ListSlice";

const Creator = ({ list, toggleCreator, listId }) => {
  const [listTittle, setListTittle] = useState("");
  const [cardContent, setCardContent] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e, changeType) => {
    changeType(e.target.value);
  };

  const createList = () => {
    toggleCreator();
    const id = nanoid();
    dispatch(addList(id, listTittle));
  };

  const createCard = () => {
    toggleCreator();
    dispatch(addCard({ listId, cardContent }));
  };

  const changeTypes = list ? setListTittle : setCardContent;

  return (
    <div
      className="ListCreator"
      style={list ? { padding: "10px" } : { width: "100%", padding: "0px" }}
    >
      <TextAreaComp
        value={list ? listTittle : cardContent}
        placeholderVal={list ? "Enter List Title" : "Enter Card Content"}
        handleChange={(e) => handleChange(e, changeTypes)}
        list={list ? true : false}
      />

      <ActionBtns
        btnLabel={list ? "Add List" : "Add Card"}
        onCancel={toggleCreator}
        onSave={list ? createList : createCard}
      />
    </div>
  );
};

export default Creator;
