import { useState, useEffect } from "react";
import Viewpane from "../components/Viewpane";
import AssignmentItem from "../components/Assignment";
import Icon from "../components/Icon";
import FinalTaskObj, { TodoObj } from "../components/AssignmentTypes";

export default function Assignments() {
  const [assignments, setAssignments] = useState<FinalTaskObj[]>([]);

  async function fetchTodoList() {
    try {
      const response = await fetch("http://localhost:5050/record/todo");
      return response;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  useEffect(() => {
    async function convertAssignments() {
      const response = await fetchTodoList();
      const data: TodoObj[] = await response?.json();
      let finalAssignments: FinalTaskObj[] = [];
      data.forEach((item) => {
        if (item.hasOwnProperty("assignment") && item.assignment) {
          const newAssignment: FinalTaskObj = {
            classification: item.type,
            type: "assignment",
            name: item.assignment.name,
            description: item.assignment.description,
            dueDate: item.assignment.due_at,
            points: item.assignment.points_possible,
            url: item.assignment.html_url,
            locked: item.assignment.locked_for_user,
            courseID: item.course_id,
          };
          finalAssignments.push(newAssignment);
        } else if (item.hasOwnProperty("quiz") && item.quiz) {
          const newQuiz: FinalTaskObj = {
            classification: item.type,
            type: "quiz",
            name: item.quiz.title,
            description: item.quiz.description,
            dueDate: item.quiz.due_at,
            points: item.quiz.points_possible,
            url: item.quiz.html_url,
            locked: item.quiz.locked_for_user,
            courseID: item.course_id,
          };
          finalAssignments.push(newQuiz);
        }
      });
      setAssignments(finalAssignments);
    }
    convertAssignments();
  }, []);

  async function handleUpdate() {
    const response = await fetchTodoList();
    const data: TodoObj[] = await response?.json();
    let finalAssignments: FinalTaskObj[] = [];
    data.forEach((item) => {
      if (item.hasOwnProperty("assignment") && item.assignment) {
        const newAssignment: FinalTaskObj = {
          classification: item.type,
          type: "assignment",
          name: item.assignment.name,
          description: item.assignment.description,
          dueDate: item.assignment.due_at,
          points: item.assignment.points_possible,
          url: item.assignment.html_url,
          locked: item.assignment.locked_for_user,
          courseID: item.course_id,
        };
        finalAssignments.push(newAssignment);
      } else if (item.hasOwnProperty("quiz") && item.quiz) {
        const newQuiz: FinalTaskObj = {
          classification: item.type,
          type: "quiz",
          name: item.quiz.title,
          description: item.quiz.description,
          dueDate: item.quiz.due_at,
          points: item.quiz.points_possible,
          url: item.quiz.html_url,
          locked: item.quiz.locked_for_user,
          courseID: item.course_id,
        };
        finalAssignments.push(newQuiz);
      }
    });
    setAssignments(finalAssignments);
  }

  function assignmentList() {
    const assignmentItems = assignments.map((item) => {
      return <AssignmentItem assignment={item} onUpdate={handleUpdate} />;
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
          <th scope="col" className="col-1 text-center">
            Course
          </th>
          <th scope="col" className="col-1 text-center">
            Type
          </th>
          <th scope="col" className="col-4 text-center">
            Name
          </th>
          <th scope="col" className="col-1 text-center">
            Points
          </th>
          <th scope="col" className="col-2 text-center">
            Due Date
          </th>
          <th scope="col" className="col-1 text-center">
            Due Time
          </th>
        </thead>
        <tbody className="table-group-divider">{assignmentList()}</tbody>
      </table>
    </Viewpane>
  );
}
