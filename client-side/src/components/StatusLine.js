import "../styles/statusLine.scss";
import Task from "./Task";

export default function StatusLine(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask } = props;

  let taskList, tasksForStatus;

  //console.log('status', status);

  function handleAddEmpty() {
    addEmptyTask(status);
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  console.log('tasksForStatus 1',tasksForStatus);

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          key={task.id}
          task={task}
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
