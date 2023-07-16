import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Bookmarks from "./pages/bookmarks";
import Reminders from "./pages/reminders";
import Assignments from "./pages/assignments";
import Settings from "./pages/settings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
