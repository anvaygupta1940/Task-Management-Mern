const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    desc: { type: String, require: true },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'doing', 'done'],
        default: 'backlog'
    },
    createdBy: {
        type: "String",
        unique: true
    }
}, { timestamps: true });

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;