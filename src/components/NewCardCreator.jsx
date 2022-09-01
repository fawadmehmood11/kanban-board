import React from "react";
import TextAreaComp from "./TextAreaComp";
import ActionBtns from "./ActionBtns";
import { useState } from "react";

const NewCardCreator = ({ toggleCardCreator }) => {
  const [cardContent, setCardContent] = useState("");

  const handleChange = (e) => {
    setCardContent(e.target.value);
  };

  return (
    <div className="ListEditor" style={{ width: "100%", padding: "0px" }}>
      <TextAreaComp
        value={cardContent}
        placeholderVal="Enter Card Content"
        handleChange={handleChange}
        list={false}
      />

      <ActionBtns
        btnLabel="Add Card"
        onCancel={toggleCardCreator}
        // createList={createList}
      />
    </div>
  );
};

export default NewCardCreator;
