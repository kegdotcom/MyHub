import React, { useState } from "react";
import { ObjectId } from "mongodb";
import { AssignmentStr } from "../pages/assignments";
import Icon from "./Icon";

interface AssignmentProps {
  assignment: AssignmentStr;
  onUpdate: () => void;
}

export default function AssignmentItem({
  assignment,
  onUpdate,
}: AssignmentProps) {
  return (
    <tr>
      <td className="text-capitalize">{assignment.course}</td>
      <td className="text-capitalize">
        <a href={assignment.link}>{assignment.name}</a>
      </td>
      <td>{assignment.points}</td>
      <td>{assignment.dueDate}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={async function deleteAssignment() {
            try {
              await fetch(
                `http://localhost:5050/record/assignments/${assignment.id}`,
                {
                  method: "DELETE",
                }
              );
              onUpdate();
            } catch (err) {
              window.alert(`Failed to delete assignment: ${err}`);
            }
          }}
        >
          <Icon name="trash3" />
        </button>
      </td>
    </tr>
  );
}
