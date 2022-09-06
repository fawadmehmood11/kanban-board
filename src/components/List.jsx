import React from "react";
import { useState, useRef } from "react";
import "../styles/List.css";
import Creator from "./Creator";
import Editor from "./Editor";
import { useDispatch } from "react-redux";
import {
  updateListTitle,
  selectCardById,
  moveList,
} from "../features/ListSlice";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useDrag, useDrop } from "react-dnd";
import { moveCard } from "../features/ListSlice";

const List = ({ list, index }) => {
  const [isAddingCard, setAddCard] = useState(false);
  const [isEditingTitle, setisEditingTitle] = useState(false);
  const { id, tittle, listCards } = list;
  const [newTittle, setNewTitle] = useState(tittle);

  const dispatch = useDispatch();
  const cards = useSelector((state) => selectCardById(state, listCards));

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "List",
      item: () => {
        // console.log("item", { id, index });
        return { id, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index]
  );
  const [, drop] = useDrop({
    accept: "List",
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
      dispatch(
        moveList({
          listId: item.id,
          dropIndex: hoverIndex,
          itemIndex: item.index,
        })
      );

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const toggleCardCreator = () => {
    setAddCard(!isAddingCard);
  };

  const toggleTitleEditing = () => {
    setisEditingTitle(!isEditingTitle);
  };

  const handleTittleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const updateTitle = (e) => {
    if (e.keyCode === 13) {
      dispatch(updateListTitle(id, newTittle));
      toggleTitleEditing();
    }
  };

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <div
      className="listItem"
      ref={ref}
      // data-handler-id={handlerId}
      style={{ opacity }}
    >
      {isEditingTitle ? (
        <Editor
          newText={newTittle}
          handleChange={handleTittleChange}
          updateContent={updateTitle}
          list={true}
        />
      ) : (
        <h5
          className="listTittle"
          onClick={toggleTitleEditing}
          style={{ cursor: "pointer" }}
        >
          {tittle}
        </h5>
      )}

      <div className="ListCards">
        {cards &&
          cards.map((card, index) => {
            return (
              <Card
                key={card[0].cardId}
                cardContent={card[0].cardContent}
                cardId={card[0].cardId}
                index={index}
                listId={id}
              />
            );
          })}

        {isAddingCard ? (
          <Creator listId={id} toggleCreator={toggleCardCreator} />
        ) : (
          <button
            className="btn btnAddList cardBtn"
            onClick={toggleCardCreator}
          >
            <i className="fa-light fa-plus"></i>
            Card
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(List);
