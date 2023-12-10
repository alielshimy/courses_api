const express = require('express');
const app = express();

const mongoose = require('mongoose');

const url = "mongodb+srv://alielshimy:nodejs_123@learn-mongo-db.8yhvunz.mongodb.net/nodejs_express_project?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
    console.log('mongodb server started');
})

app.use(express.json());

const coursesRouter = require('./routes/courses.route');

app.use("/api/courses", coursesRouter);

app.listen(4000, () => {
    console.log('Listening on port 4000');
})

