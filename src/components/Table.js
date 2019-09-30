import React, {Component} from 'react'
import row from './row'


export default class Table extends Component {

    //iterate over each row and apply method logic
    createRows = (data, fields, callback) => {
        const rows = []
        data.forEach( rowData =>  {
            const result = row(rowData, fields, callback)
 
            if(result) {
              rows.push(result)
            }
        })    
        return rows
    }
    //take in the fields state from props and create headers for csv
    createHeaders = (fields) => {
      const headers = []
      for(const field of fields){
        const header = (<tr>{field}</tr>)
        headers.push(header)
      }
      return headers
    }

    render(){
        const {data, fields, updateRows} = this.props
        return(
          <div>
             <table>  
               <thead>   
                <tr>
                  {this.createHeaders(fields)}
                </tr>         
               </thead>    
              <tbody>
                {this.createRows(data, fields, updateRows)}
              </tbody>
            </table>
          </div>
        )
    }
}


