import React, { useState } from "react";

const Card = ({ cardContent }) => {
  const [hover, setHover] = useState(false);
  const hoverBegins = () => {
    setHover(true);
  };

  const hoverEnds = () => {
    setHover(false);
  };

  return (
    <div>
      <div
        className="listCards"
        onMouseEnter={hoverBegins}
        onMouseLeave={hoverEnds}
      >
        {cardContent}
      </div>
      {/* {!hover && (
        <div className="editIcon">
          <i className="fa-light fa-pencil"></i>
        </div>
      )} */}
    </div>
  );
};

export default Card;
