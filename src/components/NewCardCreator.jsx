import React from "react";
import TextAreaComp from "./TextAreaComp";
import ActionBtns from "./ActionBtns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../features/ListSlice";

const NewCardCreator = ({ listId, toggleCardCreator }) => {
  const [cardContent, setCardContent] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCardContent(e.target.value);
  };

  const createCard = () => {
    toggleCardCreator();
    dispatch(addCard({ listId, cardContent }));
  };

  return (
    <div className="ListCreator" style={{ width: "100%", padding: "0px" }}>
      <TextAreaComp
        value={cardContent}
        placeholderVal="Enter Card Content"
        handleChange={handleChange}
        list={false}
      />

      <ActionBtns
        btnLabel="Add Card"
        onCancel={toggleCardCreator}
        onSave={createCard}
      />
    </div>
  );
};

export default NewCardCreator;
