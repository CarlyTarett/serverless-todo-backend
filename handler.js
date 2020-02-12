const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "todoDB"
});
 
// GET /tasks

app.get("/tasks", function(request, response) {
  // request is an object with lots of info about the request
  // response is an object which allows us to define what kind of response we want to send back

    connection.query("SELECT * FROM task", function(err, data){
    if(err){
        response.status(500).json({
            error: err
        })
    }
    else {
        response.status(200).json({
        tasks: data
        });
    };
});

});


// POST /developers

app.post("/tasks", function(request, response) {

    const newTask = request.body;

    console.log("XXXXXXXXXXXXdoing A CREATE XXXXXXXXXXXxx");

  
    connection.query("INSERT INTO task SET ?", [newTask], function(err, data){
  
      if(err){
        response.status(500).json({
            error: 
            err
                    })
    }
    else {
        newTask.id = data.insertId;
        response.status(201).json(newTask);
    }
  });
  
  });

// PUT /developers
app.put("/tasks/:id", function(request, response) {


  
  const updatedTask = request.body;
  const id = request.params.id;

  console.log("XXXXXXXXXXXXXupdateXXXXXXXXXXXXxx");
  console.log("id is :   ");
  console.log(id);
  console.log(updatedTask);

  console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy");


  connection.query("UPDATE task SET ? WHERE id=?", [updatedTask, id], function(err, data){

    if(err){
      response.status(500).json({
          error: err
      })
  }
  else {
      response.status(200).json({
      developers: data
      });
  };
});

});



// DELETE /developers

app.delete("/tasks/:id", function(request, response) {

    const id = request.params.id;

    
  console.log("XXXXXXXXXXXXXdeleteXXXXXXXXXXXxx");
  console.log("id is :   ");
  console.log(id);
  

  console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy");
 
    
connection.query("Delete FROM task WHERE id = 36", function(err, data){

  //connection.query("Delete FROM task WHERE id = ?", [id], function(err, data){
//connection.query("INSERT INTO comments (comment) values ( ?)", [id], function(err, data){
 
    if(err){
          response.status(500).json({
              error: err
          })
      }
     else {
          response.sendStatus(200);
      };

  });
  
  });

module.exports.app = serverlessHttp(app);