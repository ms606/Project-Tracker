import React from "react";

 // To change displays
 class Display extends React.Component{

    constructor(props) {
        super(props);
        this.state = { apiResponse: [] };
      }
    
  
       async componentDidMount() {
        const response = await fetch("http://localhost:3000/taskEverything/1");
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
                <th>Customer</th> 
                <th>Activity</th>
                <th>department</th>  
                <th>Urgency</th>
                <th>Machine Detail</th>
                <th>Expected Shipping</th>
                <th>Shipping</th>              
                <th>Resource</th>  
                <th>No Of Resource</th>  
                <th>hour</th>  
                <th>duration</th>  
                
              </thead>
  
              <tbody>
                 {Arr[0].map((task) => 
                   <tr key={task.id}>  
                      <td>{task.orderCode}</td>
                      <td>{task.customer}</td>
                      <td>{task.activity}</td>
                      <th>{task.department}</th>                      
                      <td>{task.urgency}</td>
                      <td>{task.machineDet}</td>
                      <td>{task.expectedShipping}</td>
                      <td>{task.shipping}</td>
                      <td>{task.resource}</td>
                      <th>{task.NoOfResource}</th>  
                      <th>{task.hour}</th>  
                      <th>{task.duration}</th>                      
                   </tr>                   
                 )
                 }
              </tbody>  
              </table> 
              </div>
        )
      }
  }
  

 export default Display 