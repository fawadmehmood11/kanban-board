import React, { useState } from "react";
import Editor from "./Editor";
import { updateCardContent } from "../features/ListSlice";
import { useDispatch } from "react-redux";

// const Card = ({ cardContent }) => {
const Card = ({ cardContent, cardId }) => {
  const [isEditingCard, setCardEditing] = useState(false);
  const [newContent, setNewContent] = useState(cardContent);
  const dispatch = useDispatch();

  const toggleEditor = () => {
    setCardEditing(!isEditingCard);
  };

  const handleCardChange = (e) => {
    setNewContent(e.target.value);
  };

  const saveChange = () => {
    dispatch(updateCardContent({ cardId, cardContent: newContent }));
    toggleEditor();
  };

  return (
    <>
      {isEditingCard ? (
        <Editor
          newText={newContent}
          handleChange={handleCardChange}
          toggleCardEditor={toggleEditor}
          saveEdit={saveChange}
        />
      ) : (
        <div className="listCard">
          <div className="listCards">{cardContent}</div>

          <button className="btn btnEdit" onClick={toggleEditor}>
            <i className="fa fa-pencil mr-1"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
