'use strict';

var Task    = require('../model/appModel.js');
var NewTask = require('../model/appModelDetail.js');


exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {

    //console.log('controller')
    if (err)
      res.send(err);
    //  console.log('res', task);
    res.send(task);
  });
};

exports.list_all_task_details = function(req, res) {
  NewTask.getAllTaskDetail(function(err, task) {

    //console.log('controller')
    if (err)
      res.send(err);
  //    console.log('res', task);
    res.send(task);
  });
};

exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.activity || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide task/status' });

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};

exports.create_a_task_details = function(req, res) {
  var new_task = new NewTask(req.body);
  new_task.orderCode = req.params.taskId;

  //handles null error 
   if(!new_task.orderCode){

            res.status(400).send({ error:true, message: 'Please provide the reference' });

        }
else{
  
  NewTask.createTaskDetail(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};

exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task_detail = function(req, res) {
  NewTask.getTaskDetailById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.task_everything = function(req, res) {
  NewTask.getTaskEverythingById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function(req, res) {
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task_detail = function(req, res) {
  NewTask.updateById(req.params.taskId, new NewTask(req.body), function(err, task) {
    //if (err){res.send(err)}      
    //res.send(res)
    //res.json(task);
    res.send(res.status);
  });
};

exports.delete_a_task = function(req, res) {
  Task.remove( req.params.taskId, function(err, task) {
    if (err) res.send(err)
    res.send({message: 'Task successfully deleted'});
  });
};


exports.delete_a_task_detail = function(req, res) {
  NewTask.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({message: 'Task successfully deleted'});
  });
};