import React from "react";
import "../styles/ActionBtns.css";

const ActionBtns = ({ btnLabel, toggleAddList, createList }) => {
  return (
    <div className="btnActions flex">
      <button className="btn btnAction" onClick={createList}>
        {btnLabel}
      </button>

      <button className="btn btnCancel" onClick={toggleAddList}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default ActionBtns;
