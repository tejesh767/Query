const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "mydata.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
app.post("/create/", async (request, response) => {
  const query = `create table users (username varchar(250), password varchar(250))`;
  const data = await db.run(query);
  response.send(data);
  console.log("created");
});
app.get("/add/", async (request, response) => {
  const query = `insert into users (username,password) values("iam","joseph");`;
  const data = await db.run(query);
});
app.get("/getdata/", async (request, response) => {
  const query = `select * from users;`;
  const data = await db.all(query);
  response.send(data);
});
