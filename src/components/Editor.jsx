import React from "react";
import ActionBtns from "./ActionBtns";
import TextAreaComp from "./TextAreaComp";

const Editor = ({
  newText,
  handleChange,
  toggleCardEditor,
  saveEdit,
  updateContent,
  list,
}) => {
  return (
    <>
      <TextAreaComp
        value={newText}
        handleChange={handleChange}
        saveChange={updateContent}
        list={list}
      />
      {!list && (
        <ActionBtns
          btnLabel="Save"
          onCancel={toggleCardEditor}
          onSave={saveEdit}
        />
      )}
    </>
  );
};

export default Editor;
