const express = require("express");
const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require("../controllers/tasks");

const router = express.Router();

router.get("/", (req, res) => {
    getTasks(req, res);
});

router.get("/:id", (req, res) => {
    getTaskById(req, res);
});

router.post("/", (req, res) => {
    createTask(req, res);
});

router.patch("/:id", (req, res) => {
    updateTask(req, res);
});

router.delete("/:id", (req, res) => {
    deleteTask(req, res);
});

module.exports = router;