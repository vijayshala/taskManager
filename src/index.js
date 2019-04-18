const express = require('express');
const router = new express.Router()
require("./db/mongoose.js")
const Tasks = require("./models/task.js")
const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRoute)
app.use(taskRoute)

app.listen(port , ()=>{
    console.log("server is running on port "+ port)
})