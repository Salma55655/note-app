import "./App.css";
import React from "react";
import Note from "./pages/Note";
import Notes from "./pages/Notes";
import Header from "./components/Header";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container dark ">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/note/:Id" element={<Note />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
