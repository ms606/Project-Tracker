'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.status           = task.status;
    this.orderCode        = task.orderCode;
    this.activity         = task.activity;
    this.customer         = task.customer;
    this.urgency          = task.urgency;
    this.machineDet       = task.machineDet;
    this.expectedShipping = task.expectedShipping;
    this.shipping         = task.shipping;
    this.status_new       = task.status_new;
};

Task.createTask = function (newTask, result) {    
        // console.log('getting the tasks from params', newTask);

        sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};

Task.getTaskById = function (taskId, result) { 
        sql.query(`Select id, orderCode, customer, machineDet, activity, urgency, status_new, 
                    DATE_FORMAT(expectedShipping, '%d/%m/%Y') expectedShipping , 
                    DATE_FORMAT(shipping, '%d/%m/%Y')  shipping from tasks where id = ? `, 
                   taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Task.getAllTask = function (result) {
        sql.query("Select id, orderCode, customer, machineDet, activity, status_new, urgency, DATE_FORMAT(expectedShipping, '%Y-%m-%d') expectedShipping , DATE_FORMAT(shipping, '%Y-%m-%d') shipping from tasks", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};

Task.updateById = function(id, task, result){
    console.log('idher hoon',id, task)


  sql.query("UPDATE tasks SET activity = ? ,  urgency = ?, machineDet = ? , expectedShipping = ? , Shipping = ? , orderCode = ?,  status_new = ? WHERE id = ?", 
                [task.activity, task.urgency, task.machineDet, task.expectedShipping, task.Shipping, task.orderCode, task.status, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};

Task.remove = function(id, result){
     console.log('aaa');
     console.log(id);
     sql.query("DELETE FROM tasks WHERE orderCode in (?)", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                    result(null, res);
                }
            }); 
};

module.exports = Task;