import React, { useState, useRef } from "react";
import Editor from "./Editor";
import { updateCardContent } from "../features/ListSlice";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { moveCard } from "../features/ListSlice";

// const Card = ({ cardContent }) => {
const Card = ({ cardContent, cardId, index, listId }) => {
  const [isEditingCard, setCardEditing] = useState(false);
  const [newContent, setNewContent] = useState(cardContent);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Card",
      item: () => {
        // console.log("Drag", { cardId, index });
        return { cardId, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [{ cardId, index }]
  );

  const [{ handlerId }, drop] = useDrop({
    accept: "Card",
    // drop: (item) => {
    //   console.log("item", item);
    //   if (!ref.current) {
    //     return;
    //   }

    //   // console.log(item, index);

    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   console.log("hover index", hoverIndex);
    //   // Don't replace items with themselves
    //   if (dragIndex === hoverIndex) {
    //     console.log("Same", item);
    //     return;
    //   }

    //   console.log({
    //     cardId: item.cardId,
    //     dropIndex: hoverIndex,
    //     itemIndex: item.index,
    //   });
    //   dispatch(
    //     moveCard({
    //       cardId: item.cardId,
    //       dropIndex: hoverIndex,
    //       itemIndex: item.index,
    //     })
    //   );

    //   item.index = hoverIndex;
    //   console.log("end Called", item.index);
    // },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      dispatch(
        moveCard({
          cardId: item.cardId,
          dropIndex: hoverIndex,
          itemIndex: item.index,
          listId,
        })
      );

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

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
  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

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
        <div
          className="listCard"
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
        >
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
