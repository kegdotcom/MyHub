import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (err) {
  console.error(err);
}

let db = await conn.db("MyHubTests");

export default db;
