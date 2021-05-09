'user strict';
var sql = require('./db.js');


// New Task object constructor
var TaskDetail = function(taskDetail){
    this.orderCode    = taskDetail.orderCode;
    this.resource     = taskDetail.resource;
    this.NoOfResource = taskDetail.NoOfResource;
    this.Hour         = taskDetail.Hour;
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


TaskDetail.getTaskEverythingById = function (taskId, result) {
  sql.query(`select orderCode, customer, machineDet, activity, department, resource, urgency, 
   DATE_FORMAT(expectedShipping, '%d/%m/%Y') expectedShipping , 
   DATE_FORMAT(shipping, '%d/%m/%Y')  shipping, status,  duration, Hour, NoOfResource

from
( 
    
    select t1.orderCode, t1.customer, t1.activity, t1.urgency, t1.machineDet, t1.expectedShipping, t1.shipping, t1.status, null department, null resource,  sum(t2.duration)  duration, null Hour, null NoOfResource  		  
    from   tasks t1, task_detail t2
    where  t1.orderCode = t2.orderCode
    group by t1.orderCode, t1.activity, t1.urgency, t1.machineDet, t1.expectedShipping, t1.shipping, t1.status	
    union all 
    
    select all orderCode, null customer, null activity, null urgency, null machineDet, null expectedShipping, null shipping, null status, department, resource, duration, Hour, NoOfResource  
    from  task_detail
    
) t3 
    
    order by orderCode, if(customer = '' or customer is null,1,0) 

`, taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

module.exports = TaskDetail;

