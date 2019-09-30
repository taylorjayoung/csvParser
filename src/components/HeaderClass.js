import React, {Component, Fragment} from 'react'

export default class HeaderClass extends Component { 
    //take in the fields state from props and create headers for csv
    createHeaders = (fields) => {
      const headers = []
      for(const field of fields){
        const header = (<tr>{field}</tr>)
        headers.push(header)
      }
      return headers
    }
    
  //create a semantic ui table that can be selected
  render(){
    return(
      <div>
        
          <h1>hi</h1>
      </div>
    )
  }
}



