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

  const style = {
    // border: "1px dashed gray",
    // padding: "0.5rem 1rem",
    // marginBottom: ".5rem",
    // backgroundColor: "white",
    // cursor: "move",
  };

  // console.log("rerender", { cardId, index });

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
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);

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
  // console.log(isDragging);
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
          style={{ ...style, opacity }}
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
