import React, { useState } from 'react';
import './App.css'; 

const Index = () => {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    id: ""
  });
  const [editingItem, setEditingItem] = useState({
    id: "",
    isEditing: false
  });

  const changeMessage = (e) => {
    setMessage({
      ...message,
      text: e.target.value
    });
  };

  const handleSubmit = () => {
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString()
    };
    setList([...list, newTodo]);
    setMessage({
      text: "",
      id: "",
    });
  };

  const handleDelete = (id) => {
    let newTodos = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodos);
  };

  const changeEdit = (id) => {
    setEditingItem({
      id: id,
      isEditing: true,
    });
    let editableItem = list.find((eachItem) => eachItem.id === id);
    setMessage({
      text: editableItem.text,
      id: editableItem.id
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === editingItem.id) {
        return {
          text: message.text,
          id: editingItem.id
        };
      } else {
        return eachItem;
      }
    });
    setList(newTodos);
    setEditingItem({ id: "", isEditing: false });
    setMessage({ text: "", id: "" });
  };

  return (
    <center>
      <div className="centered-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Enter some text"
            value={message.text}
            onChange={changeMessage}
          />
          {editingItem.isEditing ? (
            <button className="edit" onClick={handleEdit}>
              ✏️ Edit
            </button>
          ) : (
            <button className="add" onClick={handleSubmit}>
              ➕ Add
            </button>
          )}
        </form>
        <hr />
        {
          list.length === 0 && <h3>There are no items in the list</h3>
        }
        <ul>
          {
            list.map((eachUser) => {
              const { id, text } = eachUser;
              return (
                <li key={id}>
                  <span>{text}</span>
                  <div className="button-group">
                    <button className="edit" onClick={() => changeEdit(id)}>
                      ✏️ Edit
                    </button>
                    <button className="delete" onClick={() => handleDelete(id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </center>
  );
}

export default Index;
