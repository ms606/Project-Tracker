import React from 'react'
import ReactDOM from 'react' 

class ApiComponent extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
      }
    
      callAPI() {
        fetch("http://localhost:2000/tasks")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err)
      };
    
      componentDidMount() {
        this.callAPI();
      }
}
