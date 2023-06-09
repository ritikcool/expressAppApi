const express= require('express');
const port=8002;
const db=require('./config/mongoose');
const Student = require("./model/student_list");
const app=express();
//app.use(express.urlencoded());
app.use(express.json());

app.get("/get-students-data", async (req, res) => {
    try {
      const data = await Student.find();
  
      res.status(200).json({
        status: "OK",
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  app.post("/create-student", async (req, res) => {
    try {
      const { name, age, contact } = req.body;
  
      const data = await Student.create({ name, age, contact });
  
      res.status(201).json({
        status: "OK",
        data: data,
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  app.patch("/update-student/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const body = req.body;
  
      const result = await Student.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
  
      res.status(200).json({
        status: "OK",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  app.delete("/delete-student/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      const result = await Student.deleteOne({ _id: id });
  
      res.status(200).json({
        status: "OK",
        message: "Student has been deleted",
      });
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});