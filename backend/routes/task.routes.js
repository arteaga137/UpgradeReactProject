const express = require("express");
const router = express.Router();
const { addTask } = require("../controllers/task.controller"); //controllers
const { isAuth } = require("../middlewares/auth.middleware"); //middlewares


router.post("/", isAuth, addTask);
// router.delete("/:id", isAuth, deleteTask); //Need to implement this later

module.exports = router;