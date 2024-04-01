const Task = require("../models/task.model");

async function addTask(req, res) {
  try {
    const newTask = new Task({
      name: req.body.name,
      description: req.body.description,
      rate: req.body.rate,
    });

    await newTask.save();
    return res.json({ msg: "Task added" });
  } catch (error) {
    return res.status(500).json({ msg: "Error adding task" });
  }
}

module.exports = { addTask };
