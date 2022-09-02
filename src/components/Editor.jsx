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
    <div>
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
    </div>
  );
};

export default Editor;
