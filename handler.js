const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET /developers

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

//post 
app.post("/tasks/", function (request, response) {

  const newTask = request.body;

  response.status(201).json({
    message: `Successfully created task with description: ${newTask.description}, status: ${newTask.status},dueDate: ${newTask.dueDate}, dateAdded: ${newTask.date}`
  });
});

//put
// PUT /developers
app.put("/tasks/:id", function (request, response) {
  /*
  // For sensitive data or larger pieces of data, I can use the request body
  { name: "Fred", available: true, skills: "HTML and CSS" }
  */

  const updatedTask = request.body;
  const id = request.params.id;

  response.status(200).json({
    message: `Successfully updated task ID ${id} with description: ${updatedTask.description}, status: ${updatedTask.status},dueDate: ${updatedTask.dueDate}, dateAdded: ${updatedTask.date}`
  });
});


//delete
app.delete("/tasks/:id", function (request, response) {

  const id = request.params.id;
  
  response.status(200).json({
    message: 'Successfully deleted task ID ${id}'
  });
});


module.exports.app = serverlessHttp(app);