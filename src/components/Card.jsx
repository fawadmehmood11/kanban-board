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

  // console.log("rerender", { cardContent, cardId, index, listId });

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Card",
      item: () => {
        // console.log("item", { listId, cardId, index });
        return { listId, cardId, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [{ cardId, index }]
  );

  const [{ handlerId, isOver }, drop] = useDrop(
    {
      accept: "Card",
      collect(monitor) {
        return {
          // isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        };
      },

      drop(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        const currentList = item.listId;
        const hoveredList = listId;

        // console.log({
        //   itemIndex: item.index,
        //   hoverIndex: hoverIndex,
        // });
        if (dragIndex === hoverIndex && currentList === hoveredList) {
          return;
        }

        dispatch(
          moveCard({
            cardId: item.cardId,
            itemIndex: item.index,
            dropIndex: hoverIndex,
            currentList,
            hoveredList,
          })
        );

        item.index = hoverIndex;
        item.listId = hoveredList;
      },
    },
    [{ cardId, index }]
  );

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
        <div className="listCard" ref={ref} style={{ opacity }}>
          <div className="listCards">{cardContent}</div>

          <button className="btn btnEdit" onClick={toggleEditor}>
            <i className="fa fa-pencil mr-1"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(Card);
