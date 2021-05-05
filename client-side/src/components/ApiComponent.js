import ReactDOM from "react-dom";
import App from "./components/App";

class ApiComponent extends React.Component { 
  constructor(props) {
      super(props);
      this.state = { apiResponse: [] };
    }
  

    async componentDidMount() {
      const response = await fetch("http://localhost:3000/tasks");
      const json = await response.json();
      this.setState({ apiResponse: json });
    }

    render() {
      
      const Arr = [];

      Arr.push(this.state.apiResponse);
      
      return (
            <div>
            <table>
            <thead>
              <th>Order Code</th>
              <th>Activity</th>
              <th>Urgency</th>
              <th>Machine Detail</th>
              <th>Expected Shipping</th>
              <th>Shipping</th>              
            </thead>
            <tbody>

               {Arr[0].map((task) => 
                 <tr key={task.id}>  
                    <td>{task.orderCode}</td>
                    <td>{task.Activity}</td>
                    <td>{task.urgency}</td>
                    <td>{task.machineDet}</td>
                    <td>{task.expectedShipping}</td>
                    <td>{task.shipping}</td>
                 </tr>                   
               )}
               </tbody>  
            </table> 
            </div>
      )
    }

}
