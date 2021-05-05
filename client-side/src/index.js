import { isYieldExpression } from "@babel/types";
import React from "react";
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

      console.log(this.state.apiResponse);
    }

    render() {
      
  
      const Arr = [];

      //const Arr = this.state.apiResponse;

      //const Arr = JSON.stringify(this.state.apiResponse);
      
      Arr.push(this.state.apiResponse);

      console.log('my object from an array',Arr);

      // console.log(this.state.apiResponse);
     // console.log(Arr);
      //console.log('json stringyfy',JSON.stringify(Arr));
      
      return (
            <div>
            <table>
            <thead>
              <th>Order Code</th>
              <th>Title</th>
              <th>Urgency</th>
              <th>Machine Detail</th>
              <th>Expected Shipping</th>
              <th>Shipping</th>              
            </thead>
            <tbody>

               {Arr[0].map((task) => 
                 <tr key={task.id}>  
                    <td>{task.orderCode}</td>
                    <td>{task.title}</td>
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


ReactDOM.render(
  <React.StrictMode>
    <ApiComponent />,
    <App />
  </React.StrictMode>,
   document.getElementById("root")
);

