import { useState } from "react";
import Form from "./components/Form";
import "./App.css";
import Books from "./components/Books";

import { Button } from "@chakra-ui/react";

function App() {
  return (
    <div className="container">
      <Form />
      <Books />
    </div>
  );
}

export default App;
