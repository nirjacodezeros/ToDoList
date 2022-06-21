import React from "react";
import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { item, deleteItem } = props;

  return (
    <div className="ToDoItem">
      <p className="ToDoItem-Text">{item.text}</p>
      <button className="" onClick={() => deleteItem(item.id)}>
        Delete
      </button>
    </div>
  );
};

export default ToDoItem;
