import React from "react";
import "../styles/ActionBtns.css";

const ActionBtns = ({ btnLabel, toggleAddList }) => {
  return (
    <div className="btnActions flex">
      <button className="btn btnAction btnCreateList">{btnLabel}</button>

      <button className="btn btnCancel" onClick={toggleAddList}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default ActionBtns;
