import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Navbar() {
  const page = document.querySelector("html");
  const [theme, setTheme] = useState(
    page != null ? page.getAttribute("data-bs-theme") : "light"
  );
  const toggleTheme = () => {
    if (page === null) {
      console.error(
        "Could not change themes because the <html> element could not be read"
      );
    } else {
      const newTheme = theme === "light" ? "dark" : "light";
      page.setAttribute("data-bs-theme", newTheme);
      setTheme(newTheme);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      style={{ height: "10vh" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <Icon name="box-fill" /> MyHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <Link className="nav-link" to="/">
                <Icon name="house" /> Home
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/bookmarks">
                <Icon name="bookmarks" /> Bookmarks
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/todo">
                <Icon name="clipboard2" /> To-Do List
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" to="/assignments">
                <Icon name="layers" /> Assignments
              </Link>
            </li>
            <li className="nav-item dropdown px-2">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Icon name="gear" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={toggleTheme}
                  >
                    <Icon name={theme === "dark" ? "sun" : "moon"} /> Toggle
                    Theme
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
