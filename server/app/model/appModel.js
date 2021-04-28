'user strict';
var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
    this.orderCode = task.orderCode;
    this.title = task.title;
    this.urgency = task.urgency;
    this.machineDet = task.machineDet;
    this.expectedShipping = task.expectedShipping;
    this.Shipping = task.Shipping;
};

// New Task object constructor
var TaskDetail = function(taskDetail){
    this.orderCode    = taskDetail.orderCode;
    this.resource     = taskDetail.resource;
    this.NoOfResource = taskDetail.NoOfResource;
    this.hour         = taskDetail.hour;
    this.duration     = taskDetail.duration;
    this.department   = taskDetail.department;
}

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
Task.getTaskById = function (taskId, result) {
        sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {             
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
        sql.query("Select * from tasks", function (err, res) {

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
Task.updateById = function(id, task, result){
  sql.query("UPDATE tasks SET task = ? , title = ? , machineDet = ? , urgency = ? , expectedShipping = ? , Shipping = ? , orderCode = ?  WHERE id = ?", 
                [task.task, task.title, task.urgency, task.machineDet, task.expectedShipping, task.Shipping, task.orderCode, id], function (err, res) {
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
     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

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
module.exports = TaskDetail;


//JSON PASSING API, PUT REQUEST localhost:3000/tasks
// {
// "id" : "6",
// "task":"create repofafaffaf",
// "status":"1",
// "title" : "haha tus titttlees",
// "urgency": "high",
// "machineDet": "fsdsdfgfsdgdf",
// "expectedShipping": "2021-05-27",
// "Shipping": "2022-05-27"
// }


//JSON PASSING API, PUT REQUEST localhost:3000/taskDetail/123321
// {
// "orderCode": "2321",
// "resource" : "kamehamehaa",
// "NoOfResource": "52",
// "hour": "12",
// "duration": "12",
// "department": "12"
// }