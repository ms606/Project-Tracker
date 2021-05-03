'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
   
  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/taskDetail/:taskId')  
    .get(todoList.list_all_task_details)  
    .post(todoList.create_a_task_details)
    .delete(todoList.delete_a_task_detail)

  app.route('/taskDetailTask/:taskId')  
    .get(todoList.read_a_task_detail)  

  app.route('/taskEverything/:taskId')  
    .get(todoList.task_everything)  
    };    
