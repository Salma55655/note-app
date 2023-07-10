
import ListItem from "../components/ListItem";
// import notes from "../assets/data";
import AddBtn from "../components/AddBtn";

import React, { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([])

  useEffect( () => {
    getNotes();
  },[])

  const getNotes = async() => {
    const response = await fetch("/api/notes/");
    const data = await response.json()
    setNotes(data)
  }

  return (
    <div className="notes">

      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>

      <AddBtn />
    </div>
  );
}

export default Notes;
