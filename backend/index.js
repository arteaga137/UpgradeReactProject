const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const tasksRoutes = require("./routes/task.routes");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

PORT = process.env.PORT;
connectionString = process.env.connectionString;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log(`Database Connection Successful`);
  })
  .catch((err) => {
    console.log(`Cannot connect to Database`, err);
  });

app.use("/api/users", userRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`API working on Port ${PORT}`);
});
