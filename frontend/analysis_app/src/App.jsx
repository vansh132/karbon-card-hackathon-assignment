import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./components/FileUpload";
function App() {
  return (
    <>
      <h1>Karbon Card Hackathon Assignment</h1>
      <h5>by Vansh (2347152)</h5>
      <FileUpload />
    </>
  );
}

export default App;
