import React, { useState } from "react";
import { TaskStr } from "../pages/todo";
import { ObjectId } from "mongodb";
import Icon from "./Icon";

interface TaskProps {
  id: ObjectId;
  task: string;
  note: string;
  complete: string;
  onUpdate: () => void;
}

export default function TaskItem({
  id,
  task,
  note,
  complete,
  onUpdate,
}: TaskProps) {
  return (
    <tr className={complete === "complete" ? "table-success" : "table-danger"}>
      <td>
        <button
          className="btn"
          onClick={async function updateTaskStatus() {
            const newCompletion =
              complete === "complete" ? "incomplete" : "complete";
            const editedTask = {
              task: task,
              note: note,
              complete: newCompletion,
            };
            try {
              await fetch(`http://localhost:5050/record/tasks/${id}`, {
                method: "PATCH",
                body: JSON.stringify(editedTask),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              onUpdate();
            } catch (err) {
              window.alert(`Failed to update task: ${err}`);
            }
          }}
        >
          <Icon
            name={complete === "complete" ? "clipboard2-x" : "clipboard2-check"}
          />
        </button>
      </td>
      <td>{task}</td>
      <td>{note}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={async function deleteTask() {
            try {
              await fetch(`http://localhost:5050/record/tasks/${id}`, {
                method: "DELETE",
              });
              onUpdate();
            } catch (err) {
              window.alert(`Failed to delete task: ${err}`);
            }
          }}
        >
          <Icon name="trash3" />
        </button>
      </td>
    </tr>
  );
}
