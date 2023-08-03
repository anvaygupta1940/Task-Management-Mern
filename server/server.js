const express = require("express");
const app = express();
require("../database/db.js");
const cors = require("cors");
const authRoute = require("./Routes/auth.js");
const taskRoute = require("./Routes/task.js");
const morgan = require("morgan");


// Middleware configurations
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



//  Routes
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.listen(8000, () => {
    console.log("Server is running at port 8000");
})