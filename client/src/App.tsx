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
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
