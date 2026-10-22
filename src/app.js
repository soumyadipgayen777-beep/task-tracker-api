const express = require("express");

const app = express();
const router = require("./routes/tasks");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to task tracker api");
});

app.use("/api/tasks", router);

module.exports = app;