const mongoose = require("mongoose");
// const dotenv = require("dotenv");


// Middleware configurations
// dotenv.config();



// SETTING UP DATABASE 
mongoose.connect("mongodb+srv://anvaygupta:pJGMGhzGeQqqJEsm@cluster0.t47djwm.mongodb.net/TaskManager?retryWrites=true&w=majority").then(() => {
    console.log("MongoDb database connected and running...");
}).catch((err) => {
    console.error(` Error connecting to MongoDb : ${err}`);
})
