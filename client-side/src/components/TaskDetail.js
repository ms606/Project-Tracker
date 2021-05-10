import "../styles/taskDetail.scss";
import { useState } from "react";
import moment from "moment";

export default function TaskDetail (props) {
    const { addTaskDetail, deleteTaskDetail, taskDetail, taskOrderCode } = props;
    
    //console.log('Add task detail collapsed', taskDetail);
    //console.log('Delete task detail logging',deleteTaskDetail);

    const [collapsed,  setCollapsed ] = useState(taskDetail.isCollapsed);
    const [formAction, setFormAction] = useState("");
    const [duration, setDuration] = useState("");
    const [enddd, setEnddd] = useState("");
    
    //console.log('Add task', taskDetail.isCollapsed);
    //console.log('propies ', props);
    //console.log('propies detials', taskOrderCode);

    function handleChangeDur(e){
      setDuration(e.target.value);
    }

    function handleChange(e){
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      var date = new Date(e.target.value ) ;

      var d  = new Date(date);

      d.setDate(date.getDate() + parseInt(duration));
      
      console.log(moment(d).format('DD-MMM-YYYY'));     

      console.log(duration);     

      taskDetail.endDate = moment(d).format('DD-MMM-YYYY');

      setEnddd(moment(d).format('DD-MMM-YYYY'));

    }

    function handleSubmit(event) {
      event.preventDefault();
  
      if (formAction === "save") {
        if (collapsed) {
          setCollapsed(false);
        } else {
        
        let newTaskDetail = {
            id: taskDetail.id,
            orderCode: taskOrderCode,
            isCollapsed: true,
            status: taskDetail.status,
            resource: event.target.elements.resource.value,
            NoOfResource: event.target.elements.NoOfResource.value,
            hour: event.target.elements.hour.value,
            duration: event.target.elements.duration.value,
            department: event.target.elements.department.value,
            startDate: event.target.elements.startDate.value, 
            endtDate: event.target.elements.endDate.value, 
            //taskOrderCode: taskDetail.taskOrderCode
        };
    
        addTaskDetail(newTaskDetail);
        setCollapsed(true);
        }
      }
  
      if (formAction === "delete") {
        deleteTaskDetail(taskDetail.id);
      }
    }
  
    return (
      <div >
        {/* //className={`task ${collapsed ? "collapsedTask" : ""}`}> */}
    
        <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
                
          <br />  
          <br />
          <input
            type="text"
            className="title input"
            name="department"
            placeholder="Enter Department"
            disabled={collapsed}
            defaultValue={taskDetail.department}
          />

          <input
            type="text"
            className="title input"
            name="resource"
            placeholder="Enter Resource."
            disabled={collapsed}
            defaultValue={taskDetail.resource}
          />

          <input
            type="text"
            className="title input"
            name="NoOfResource"
            placeholder="Number Of Resource "
            disabled={collapsed}
            defaultValue={taskDetail.NoOfResource}
          />

          <input
            type="text"
            className="title input"
            name="hour"
            placeholder="Enter Hour"
            disabled={collapsed}
            defaultValue={taskDetail.hour}
          />
          
          <input
            type="number"
            className="title input"
            name="duration"
            placeholder="Enter Duration"
            disabled={collapsed}
            defaultValue={taskDetail.duration}
            onChange={handleChangeDur}
          />

          <br />
          <label>Select Start Date      </label>
          <input
            type="date"
            className="title input"
            name="startDate"
            placeholder="Select Start Date"
            disabled={collapsed}
            defaultValue={taskDetail.startDate}
            onChange={handleChange}
          />
          
          <br />
          <label>Select End Date             </label>
          <input
            type="text"
            className="title input"
            name="endDate"
            placeholder="Select End Date"
            disabled={collapsed}
            value={enddd}
            defaultValue={enddd}
          />
          
          <br />
          <br />
          <button
            onClick={() => {
              setFormAction("save");
            }}
            className="button"
          >
            {collapsed ? "Edit" : "Save"}
          </button>
          {collapsed && (
            <button
              onClick={() => {
                setFormAction("delete");
              }}
              className="button delete"
            >
              X
            </button>
          )}
        </form>
      </div>
    );
}
