const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

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

app.listen(3000, () => {
  console.log("App Running---> Port: 3000");
});

//------------SIGN IN (ENDPOINT)--------------
app.post("/signin", (req, res) => { signin.handleSignIn(req, res, db, bcrypt)})
//------------REGISTER (ENDPOINT)--------------
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})
//------------PROFILE (ENDPOINT)--------------
app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db)})
//------------PROFILE (ENDPOINT)--------------
app.put("/image", (req, res) => {profile.handleImage(req, res, db)})
app.put("/imageurl", (req, res) => {profile.handleApiCall(req, res)})