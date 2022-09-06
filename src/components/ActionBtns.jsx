import React from "react";
import "../styles/ActionBtns.css";

const ActionBtns = ({ btnLabel, onCancel, onSave }) => {
  return (
    <div className="btnActions flex">
      <button className="btn btnAction" onClick={onSave}>
        {btnLabel}
      </button>

      <button className="btn btnCancel" onClick={onCancel}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default ActionBtns;
