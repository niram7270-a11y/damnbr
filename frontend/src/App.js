import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { MultiWalletProvider } from "./contexts/MultiWalletContext";

function App() {
  return (
    <div className="App">
      <MultiWalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </MultiWalletProvider>
    </div>
  );
}

export default App;