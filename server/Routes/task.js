const router = require("express").Router();
const Task = require("../../database/models/Task");
const User = require("../../database/models/User");


/* Add task */
router.post("/add", async (req, res) => {
    const { title, desc, email } = req.body;
    try {
        if (!title) return res.status(400).json("Please enter the title of task");
        if (!desc) return res.status(400).json("Please enter the description of task");

        const newTask = new Task({
            title,
            desc,
            createdBy: email
        });
        await newTask.save();
        return res.status(201).send(newTask);
    } catch (err) {
        return res.status(400).json("Addition of task failed ..");
    }
})

/* get all taks */
router.get("/tasks", async (req, res) => {
    const { email } = req.body;
    try {
        // console.log(req.body);
        let taskList = await Task.find();
        // await console.log(taskList);
        res.status(200).send(taskList);
    } catch (err) {
        return res.status(400).json(err);
    }
})

/* update status of task */
router.patch("/:id", async (req, res) => {
    const { id, status, dir } = req.body;

    try {
        let task = await Task.findById(id);
        if (dir === "right") {
            if (task.status === "backlog") {
                task.status = "todo",
                    task.save();
                return res.send(task);
            } else if (task.status === "todo") {
                task.status = "doing",
                    task.save();
                return res.send(task);
            } else if (task.status === "doing") {
                task.status = "done",
                    task.save();
                return res.send(task);
            }
        } else {
            if (task.status === "todo") {
                task.status = "backlog",
                    task.save();
                return res.send(task);
            } else if (task.status === "doing") {
                task.status = "todo",
                    task.save();
                return res.send(task);
            } else if (task.status === "done") {
                task.status = "doing",
                    task.save();
                return res.send(task);
            }
        }
    } catch (err) { }
})

/* delete task*/
router.delete("/delete/:id", async (req, res) => {
    // console.log("delete called");
    const { id } = req.params;
    // console.log(id);]
    try {
        const res = await Task.findByIdAndDelete(id);
        // console.log(res);
        return res.status(200).send(res);
    } catch (err) {
        return res.status(400).send("Deletion of task failed");
    }
})
module.exports = router;