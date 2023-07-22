import React, { useState, useEffect } from "react";
import { ObjectId } from "mongodb";
import Viewpane from "../components/Viewpane";
import AssignmentItem from "../components/Assignment";
import Icon from "../components/Icon";

export interface AssignmentStr {
  id: ObjectId;
  name: string;
  course: string;
  link: string;
  type: string;
  points: number;
  dueDate: string;
}

export default function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentStr[]>([]);

  async function fetchAssignments() {
    const response = await fetch("http://localhost:5050/record/assignments");

    if (!response.ok) {
      window.alert(`Error fetching assignments: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  }

  useEffect(() => {
    async function initialFetchAssignments() {
      const data = await fetchAssignments();
      setAssignments(data);
    }
    initialFetchAssignments();
  }, []);

  async function handleUpdate() {
    const data = await fetchAssignments();
    setAssignments(data);
  }

  function assignmentList() {
    const assignmentItems = assignments.map((a) => {
      return <AssignmentItem assignment={a} onUpdate={handleUpdate} />;
    });
    return assignmentItems;
  }

  return (
    <Viewpane>
      <h1>
        Assignments
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ float: "right" }}
          onClick={() => handleUpdate()}
        >
          <Icon name="arrow-clockwise" />
        </button>
      </h1>
      <table className="table table-hover table-striped">
        <thead>
          <th scope="col" className="col-2">
            Course
          </th>
          <th scope="col" className="col-4">
            Name
          </th>
          <th scope="col" className="col-1">
            Points
          </th>
          <th scope="col" className="col-2">
            Due Date
          </th>
          <th scope="col" className="col-1">
            Hide
          </th>
        </thead>
        <tbody className="table-group-divider">{assignmentList()}</tbody>
      </table>
    </Viewpane>
  );
}
