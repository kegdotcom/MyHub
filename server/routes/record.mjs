import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
const router = express.Router();

// GET request to get a list of bookmarks from the bookmarks collection of the databse
router.get("/bookmarks", async (req, res) => {
  let collection = await db.collection("bookmarks");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// POST request to add a new bookmark to the bookmarks collection of the database
router.post("/bookmarks", async (req, res) => {
  let newBookmark = {
    name: req.body.name,
    url: req.body.url,
    color: req.body.color,
  };

  let collection = await db.collection("bookmarks");
  let result = await collection.insertOne(newBookmark);
  res.send(result).status(204);
});

// DELETE request to remove a specific bookmark from the bookmarks collection of the database by ID
router.delete("/bookmarks/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("bookmarks");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// GET request to get all reminders from the reminders collection of the database
router.get("/tasks", async (req, res) => {
  let collection = await db.collection("todo");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// POST request to add a new reminder to the reminders collection of the database
router.post("/tasks", async (req, res) => {
  let newReminder = {
    task: req.body.task,
    note: req.body.note,
    complete: req.body.complete,
  };

  let collection = await db.collection("todo");
  let result = await collection.insertOne(newReminder);
  res.send(result).status(204);
});

// DELETE request to delete a specific reminder from the reminders collection of the database
router.delete("/tasks/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("todo");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// PATCH request to update a specific reminder to change its completion status
router.patch("/tasks/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      task: req.body.task,
      note: req.body.note,
      complete: req.body.complete,
    },
  };

  let collection = await db.collection("todo");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

router.get("/todo", async (req, res) => {
  const kegAuthToken = process.env.K_AUTH;
  const joeAuthToken = process.env.J_AUTH;
  const baseURL = process.env.CANVAS_BASE_URL;

  try {
    const response = await fetch(`https://${baseURL}/api/v1/users/self/todo`, {
      headers: {
        Authorization: `Bearer ${joeAuthToken}`,
      },
    });
    const data = await response.json();
    res.send(data).status(200);
  } catch (err) {
    console.error(err);
    res.send(err).status(404);
  }
});

export default router;
