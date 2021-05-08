import "../styles/statusLine.scss";
import Task from "./TaskDetailEdit";

export default function StatusLine(props) {
  const { status, taskDetail, addTaskDetail, deleteTask, addEmptyTask, taskOrderCode } = props;

  let taskList, tasksForStatus;
  
  //console.log('status',status);

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (taskDetail) {
    tasksForStatus = taskDetail.filter((task) => {
    return task.status === status;
    });
  }

  //console.log('props status line details',props.tasks.orderCode);
  //console.log('taskOrderNoKewl',taskOrderCode);
  //console.log('tasksForStatus',tasksForStatus);
  
  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {

      //console.log('Loop understanding here..', task)  ;
      //console.log('Loop understanding here.. 1', (id))  ;
      //console.log('Loop understanding here.. 2', task.id)  ;
      return (
        <Task
          addTaskDetail   = {(task) => addTaskDetail(task)}
          deleteTaskDetail= {(id)   => deleteTask(id)}
          key             = {task.id}
          taskDetail      = {task}
          taskOrderCode   = {props.tasks[0].orderCode}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
    </div>
  );
}
