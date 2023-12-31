import { useState, useEffect } from "react";
import Viewpane from "../components/Viewpane";
import { ObjectId } from "mongodb";
import TaskItem from "../components/Task";
import Icon from "../components/Icon";
import { TaskModal } from "../components/Modals";

export interface TaskStr {
  _id: ObjectId;
  task: string;
  note: string;
  complete: string;
}

export default function Todo() {
  const [tasks, setTasks] = useState<TaskStr[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function fetchTasks() {
    const response = await fetch("http://localhost:5050/record/tasks");

    if (!response.ok) {
      window.alert(`An error occured fetching tasks: ${response.statusText}`);
      return;
    }

    const tasks = await response.json();
    return tasks;
  }

  useEffect(() => {
    async function initialFetchTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }
    initialFetchTasks();
  }, []);

  async function handleUpdate() {
    const data = await fetchTasks();
    setTasks(data);
  }

  function taskList() {
    if (tasks.length > 0) {
      return tasks.map((task) => {
        return (
          <TaskItem
            key={task._id.toString()}
            id={task._id}
            task={task.task}
            note={task.note}
            complete={task.complete}
            onUpdate={handleUpdate}
          />
        );
      });
    }
  }

  return (
    <Viewpane>
      <div>
        <h1>
          To-Do List
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ float: "right" }}
            onClick={() => setModalOpen(!modalOpen)}
          >
            <Icon name="clipboard2-plus" />
          </button>
        </h1>
      </div>
      {modalOpen && <TaskModal open={setModalOpen} onAdd={handleUpdate} />}
      <table className="table table-hover table-striped">
        <thead>
          <th scope="col" className="col-1">
            Complete
          </th>
          <th scope="col" className="col-5">
            Task
          </th>
          <th scope="col" className="col-3">
            Note
          </th>
          <th scope="col" className="col-1">
            Delete
          </th>
        </thead>
        <tbody className="table-group-divider">{taskList()}</tbody>
      </table>
    </Viewpane>
  );
}
