import "../styles/statusLineEdit.scss";
import Task from "../screens/TaskEdit";

export default function StatusLineEdit(props) {
  const { status, tasks, addTask, deleteTaskEdit, moveTask } = props;

  let taskList, tasksForStatus;

  // function handleAddEmpty() {
  //   addEmptyTask(status);
  // }


//   if (tasks) {
//     tasksForStatus = tasks.filter((task) => {
//       return task.status === status;
//     });
//   }

    //console.log(tasks);
     tasksForStatus = tasks ;

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTaskEdit={(id) => deleteTaskEdit(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key= {task.orderCode}
          task={task}
        />
      );
    });
  }

  return (
    <div className="statusLine">
      <h3>{status}</h3>
      {taskList}
      {/* <button onClick={handleAddEmpty} className="button addTask">
        +
      </button> */}
    </div>
  );
}
