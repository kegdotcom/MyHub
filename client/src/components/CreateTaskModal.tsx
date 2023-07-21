import React, { useState, FormEvent } from "react";
import { TaskStr } from "../pages/todo";

interface TModalProps {
  open: (state: boolean) => void;
  onAdd: () => void;
}

interface FormData {
  task: string;
  note: string;
  complete: string;
}

export default function TaskModal({ open, onAdd }: TModalProps) {
  const [form, setForm] = useState<FormData>({
    task: "",
    note: "",
    complete: "",
  });

  function updateForm(val: Partial<FormData>) {
    setForm((prev) => {
      return { ...prev, ...val };
    });
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();

    const newTask = { ...form };

    if (newTask.task === "") return open(false);

    await fetch("http://localhost:5050/record/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ task: "", note: "", complete: "" });
    open(false);
    onAdd();
  }

  return (
    <div
      style={{
        padding: "5px",
        margin: "20px",
        borderRadius: "5px",
        backgroundColor: "rgba(128,128,128,0.5",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">New Task</h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => open(false)}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="input-group" style={{ padding: "5px" }}>
                <span className="input-group-text" key="reminder-field">
                  Task:
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Task"
                  aria-label="Task"
                  aria-describedby="task-field"
                  onChange={(e) => updateForm({ task: e.target.value })}
                />
              </div>
              <div className="input-group" style={{ padding: "5px" }}>
                <label className="input-group-text" key="note-field">
                  Note:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Note (Optional)"
                  aria-label="Task Note"
                  aria-describedby="note-field"
                  onChange={(e) => updateForm({ note: e.target.value })}
                />
              </div>
              <div className="input-group" style={{ padding: "5px" }}>
                <button className="btn btn-danger">Cancel</button>
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Create"
                />
              </div>
              {/* now add a input-group div with the three radio buttons to select the state of the remidners 
              also make sure to check the types of the radio inputs and make sure it sets the form param
              to the ReminderStatus type that corresponds to it
              or maybe just change to a number or string instead of an enum for the database*/}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
