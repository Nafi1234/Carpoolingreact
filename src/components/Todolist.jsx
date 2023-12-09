import React, { useState } from "react";

function Todolist() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleClick = () => {
    if (task !== "") {
      if (editIndex !== null) {
        const updatedList = [...list];
        updatedList[editIndex] = task;
        setList(updatedList);
        setEditIndex(null);
      } else {
        setList([...list, task]);
      }
      setTask("");
    }
  };

  const handleEdit = (index) => {
    setTask(list[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="add">Enter the task</label>
      <input type="text" id="add" onChange={handleChange} value={task}></input>
      <button onClick={handleClick}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      {list.length > 0 && (
        <ul>
          {list.map((value, index) => (
            <li key={index}>
              {value}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todolist;
