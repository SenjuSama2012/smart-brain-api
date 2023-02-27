const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "holmydick",
    database: "smart-brain",
  },
});

db.select("*").from("users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(database.users);
});

//------------SIGN IN (ENDPOINT)--------------
app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});
//------------REGISTER (ENDPOINT)--------------
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
//------------PROFILE (ENDPOINT)--------------
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});
//------------IMAGE (ENDPOINT)--------------
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("App Running---> Port: 3000");
});
