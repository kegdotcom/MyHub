import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

//define the structure of the form data
interface FormData {
  name: string;
  url: string;
  color: string;
}

interface BModalProps {
  open: (state: boolean) => void;
  onAdd: () => void;
}

export default function CreateBookmarkModal({ open, onAdd }: BModalProps) {
  //use a state hook to keep track of the form data
  const [form, setForm] = useState<FormData>({
    name: "",
    url: "",
    color: "",
  });

  //update the state variable whenever one of the form inputs is updated
  function updateForm(val: Partial<FormData>) {
    setForm((prev) => {
      return { ...prev, ...val };
    });
  }

  //define the function for when the form is submitted
  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();

    //store the form data when submitted
    const newBookmark = { ...form };

    if (newBookmark.name === "" || newBookmark.url === "") return open(false);

    //send a post request with the form data to the server which will be passed to MongoDB by Express
    await fetch("http://localhost:5050/record/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    }).catch((error) => {
      //catch errors and alert the user that something has gone wrong
      window.alert(error);
      return;
    });

    //reset the form to its blank state
    setForm({ name: "", url: "", color: "" });
    open(false);
    onAdd();
  }

  return (
    <div
      style={{
        padding: "5px",
        margin: "20px",
        borderRadius: "5px",
        backgroundColor: "rgba(128,128,128,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" key="newBookmarkModalLabel">
              New Bookmark
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => open(false)}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="input-group" style={{ padding: "5px" }}>
                <span className="input-group-text" key="name-field">
                  Name:
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bookmark Name"
                  aria-label="Bookmark Name"
                  aria-describedby="name-field"
                  onChange={(e) => updateForm({ name: e.target.value })}
                ></input>
                <span className="input-group-text" key="color-field">
                  Color:
                </span>
                <input
                  type="color"
                  className="form-control form-control-color"
                  aria-label="Bookmark Color"
                  aria-describedby="color-field"
                  onChange={(e) => updateForm({ color: e.target.value })}
                ></input>
              </div>
              <div className="input-group" style={{ padding: "5px" }}>
                <span className="input-group-text" key="url-field">
                  URL:
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bookmark URL"
                  aria-label="Bookmark URL"
                  aria-describedby="url-field"
                  onChange={(e) => updateForm({ url: e.target.value })}
                ></input>
              </div>
              <div className="input-group" style={{ padding: "5px" }}>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => open(false)}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  className="btn btn-outline-success"
                  value="Create"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
