import React from "react";
import "./style/App.scss";
import { NoteList } from "./components/NoteList/NoteList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { ModalContainer } from "./components/Modals/ModalContainer";

function App() {
  return (
    <main className="container">
      <SearchBar />
      <NoteList />
      <ModalContainer />
    </main>
  );
}

export default App;
