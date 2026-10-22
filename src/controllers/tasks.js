const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const tasksFilePath = path.join(__dirname, "../../data/tasks.json");

function getTasks(req, res) {
    fs.readFile(tasksFilePath, "utf-8", (err, data) => {
        console.log("getTasks called");
        if (err) {
            console.error("Error:", err.message);
            res.status(500).send("Error retreiving tasks");
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
}

function getTaskById(req, res) {
    fs.readFile(tasksFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).send("Error retreiving task");
        } else {
            const id = req.params.id;
            const tasks = JSON.parse(data);
            const task = tasks.find((a) => a.id === id);
            if (task) {
                res.status(200).send(task);
            } else {
                res.status(404).send("Task not found");
            }
        }
    });
}

async function createTask(req, res) {
    if (!req.body) {
        res.status(400).json({
            error: "Missing body in request"
        });
    }

    if (!req.body.title || typeof (req.body.title) !== "string" || req.body.title.trim() === "") {
        res.status(400).json({ error: "Title is required and must be a non-empty string" });
        return;
    }
    const taskObj = {
        "id": crypto.randomUUID(),
        "title": req.body.title.trim(),
        "completed": false
    }

    try {
        const data = await fs.promises.readFile(tasksFilePath, "utf-8");
        const tasks = JSON.parse(data);
        tasks.push(taskObj);
        await fs.promises.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
        res.status(201).json(taskObj);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: err.message
        });
    }

}

function updateTask(req, res) {
    fs.readFile(tasksFilePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error:", err.message);
            res.status(500).send("Error retreiving task");
        } else {
            const id = req.params.id;
            const tasks = JSON.parse(data);
            const task = tasks.find((a) => a.id === id);
            if (!task) {
                res.status(404).send("Task not found");
                return;
            } else {
                if (req.body.title) {
                    if (typeof (req.body.title) === "string") {
                        if (req.body.title.trim() === "") {
                            res.status(400).send("Invalid title");
                            return;
                        } else {
                            task.title = req.body.title.trim();
                        }
                    }else{
                        res.status(400).send("Invalid title");
                        return;
                    }
                }
                if (req.body.completed !== undefined) {
                    if (typeof (req.body.completed) !== "boolean") {
                        res.status(400).send("Invalid complete value");
                        return;
                    } else {
                        task.completed = req.body.completed;
                    }
                }
                fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8", (err) => {
                    if(err){
                        res.status(500).json({
                            error: err.message
                        });
                        return;
                    }else{
                        res.status(200).json(task);
                    }
                });
            }
        }
    });
}

function deleteTask(req, res){
    if(req.params.id === undefined){
        return res.status(400).send("Id is required to delete a task");
    }
    fs.readFile(tasksFilePath, "utf-8", (err, data) => {
        if(err){
            console.error(err.message);
            return res.status(500).json({
                error: err.message
            });
        }
        const id = req.params.id;
        const tasks = JSON.parse(data);
        const deletedTask = tasks.find((a) => a.id === id);
        if(deletedTask === undefined) return res.status(404).send("Task not found");
        const result = tasks.filter((a) => a.id !== id);
        fs.writeFile(tasksFilePath, JSON.stringify(result, null, 2), "utf-8", (err) => {
            if(err){
                console.error(err.message);
                return res.status(500).json({
                    error: err.message
                });
            }
            res.status(200).json({
                status: "Task deleted",
                deletedTask: deletedTask
            });
        });
    });
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}