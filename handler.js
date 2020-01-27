const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {

  console.log(request);
  response.status(200).json({
    tasks: [
      { id: 1, description: "Task 1", status: "live", dateAdded: "2019-12-02" },
      { id: 2, description: "Task 2 ", status: "live", dateAdded: "2019-12-02" },
      { id: 3, description: "Task 3", status: "completed", dateAdded: "2019-12-02" }

    ]
  });
});


app.post("/tasks", function (request, response) {

  const newTask = request.body;

  response.status(201).json({
    message: `Successfully created task with description: ${newTask.description}, status: ${newTask.status},dueDate: ${newTask.dueDate}, dateAdded: ${newTask.date}`
  });
});



app.put("/tasks/:id", function (request, response) {

  const updatedTask = request.body;
  const id = request.params.id;

  response.status(200).json({
    message: `Successfully updated task ID ${id} with description: ${updatedTask.description}, status: ${updatedTask.status},dueDate: ${updatedTask.dueDate}, dateAdded: ${updatedTask.date}`
  });
});


app.delete("/tasks/:id", function (request, response) {

  const id = request.params.id;
  
  response.status(200).json({
    message: 'Successfully deleted task ID ${id}'
  });
});

module.exports.app = serverlessHttp(app);