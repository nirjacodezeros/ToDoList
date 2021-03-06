import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";

const ToDo = () => {
  const [list, setList] = useState([
    { id: 1, text: "clean the house" },
    { id: 2, text: "buy milk" },
  ]);
  const [toDo, setToDo] = useState("");

  const generateId = () => {
    if (list && list.length > 1) {
      return Math.max(...list.map((t) => t.id)) + 1;
    } else {
      return 1;
    }
  };

  const createNewToDoItem = () => {
    //validate todo
    if (!toDo) {
      alert("Please enter a todo!");
      return;
    }
    const newId = generateId();
    const newToDo = { id: newId, text: toDo };
    setList([...list, newToDo]);
    setToDo("");
  };

  const handleInput = (e) => {
    setToDo(e.target.value);
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="ToDo">
      <h1 className="ToDo-Header">List-1</h1>
         
           <div className="ToDoInput">
        <input type="text" value={toDo} onChange={handleInput} />
      </div>
      <div>
         <br/>
      <button className="" onClick={createNewToDoItem}>
        Add
      </button>
      </div>
      <div>
        <br />
      </div>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {list.map((item) => {
            return (
              <ToDoItem key={item.id} item={item} deleteItem={deleteItem} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
