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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <Icon name="house" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookmarks">
                <Icon name="bookmarks" /> Bookmarks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reminders">
                <Icon name="list-task" /> Reminders
              </Link>
            </li>
            <li className="nav-item dropdown">
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
                    className="btn btn-secondary"
                    onClick={toggleTheme}
                  >
                    <Icon name={theme === "dark" ? "moon" : "sun"} /> Toggle
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
