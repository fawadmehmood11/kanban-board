import React from "react";
import TextAreaComp from "./TextAreaComp";

const Editor = ({ tittle, handleChange, updateTitle, list }) => {
  return (
    <TextAreaComp
      value={tittle}
      handleChange={handleChange}
      list={list}
      saveChange={updateTitle}
    />
  );
};

export default Editor;
