import React, { useState } from "react";
import Editor from "./Editor";
const Card = ({ cardContent }) => {
  const [isEditingCard, setCardEditing] = useState(false);
  const [newContent, setNewContent] = useState(cardContent);

  const toggleEditor = () => {
    setCardEditing(!isEditingCard);
  };

  const handleCardChange = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <>
      {isEditingCard ? (
        <Editor
          newText={newContent}
          handleChange={handleCardChange}
          toggleCardEditor={toggleEditor}
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
