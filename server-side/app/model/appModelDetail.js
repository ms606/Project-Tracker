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
    this.startDate    = taskDetail.startDate;
    this.endDate      = taskDetail.endDate;
}

TaskDetail.createTaskDetail = function (newTask, result) {    
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

TaskDetail.remove = function(task, result){

     task = JSON.parse(task);

    console.log([task.orderCode, task.department, task.resource]);
     sql.query("DELETE FROM task_detail WHERE orderCode in (?) and duration = ? and resource in (?)", [task.orderCode, task.duration. task.resource], function (err, res) {

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
   DATE_FORMAT(shipping, '%d/%m/%Y')  shipping, status,  duration, Hour, NoOfResource,
   startDate, endDate, endDate expectedShipping_, null delay

from
( 
    
    select t1.orderCode, t1.customer, t1.activity,  null department, t1.urgency, t1.machineDet, t1.expectedShipping, t1.shipping, t1.status, null resource,  sum(t2.duration)  duration, null Hour, null NoOfResource , 
           null startDate, null endDate 		  
    from   tasks t1, task_detail t2
    where  t1.orderCode = t2.orderCode
    group by t1.orderCode, t1.activity, t1.urgency, t1.machineDet, t1.expectedShipping, t1.shipping, t1.status	
    union all 
    
    select all orderCode, null customer, null activity, department, null urgency, null machineDet, null expectedShipping, null shipping, null status, resource, duration, Hour, NoOfResource ,
           DATE_FORMAT(startDate, '%d/%m/%Y') startDate, DATE_FORMAT(endDate, '%d/%m/%Y')  endDate  
    from   task_detail
    
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

