
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
// import notes from "../assets/data";
import { ReactComponent as Left } from "../assets/arrow-left.svg";
import { Link, useNavigate } from "react-router-dom";


function Note(props) {
  const { Id } = useParams();
  const [ note, setNote] =useState(null)

  useEffect(() => {
    getNote();
  }, [Id])

  const navigate = useNavigate();
  const Goback = () => {
    navigate("/", { replace: true });
  };


  const getNote = async () => {
    if (Id === 'new') return

    const response = await fetch(`/api/notes/${Id}/`);
    const data = await response.json();
    setNote(data);
  };


  let updateNote = async () => {
    fetch(`/api/notes/${Id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () =>{
    fetch(`/api/notes/${Id}/` , {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
      },
    });
    Goback();
  }

  const createNote = async() =>{
    fetch('/api/notes/' , {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(note),
    });
  };

  const handleSubmit = () => {

    if (Id !== "new" && note.body === "") {
      deleteNote();
    } else if (Id !== "new") {
      updateNote();
    } else if (Id === "new" && note.body !== null) {
      createNote();
    }

    updateNote();

    Goback();
  }

  const handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
};
  return (
    <div className="note">
      <div className="note-header">
        <h3 onClick={handleSubmit}>
          <Left />
        </h3>

        {Id !== "new" ? (
          <button className="cursor-pointer" onClick={deleteNote}>
            Delete
          </button>
        ) : (
          <botton className="cursor-pointer" onClick={handleSubmit}>
            Done
          </botton>
        )}
      </div>

      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
}

export default Note;
