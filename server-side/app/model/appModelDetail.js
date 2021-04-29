'user strict';
var sql = require('./db.js');


// New Task object constructor
var TaskDetail = function(taskDetail){
    this.orderCode    = taskDetail.orderCode;
    this.resource     = taskDetail.resource;
    this.NoOfResource = taskDetail.NoOfResource;
    this.hour         = taskDetail.hour;
    this.duration     = taskDetail.duration;
    this.department   = taskDetail.department;
}

TaskDetail.createTaskDetail = function (newTask, result) {    
         console.log('getting the tasks from params', newTask);

        sql.query("INSERT INTO task_detail set ?", newTask, function (err, res) {
                
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

TaskDetail.getTaskDetailById = function (taskId, result) {
        sql.query("Select * from task_detail where orderCode = ? ", taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};


TaskDetail.getAllTaskDetail = function (result) {
        sql.query("Select * from task_detail", function (err, res) {

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

TaskDetail.remove = function(id, result){
     sql.query("DELETE FROM task_detail WHERE orderCode = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports = TaskDetail;

