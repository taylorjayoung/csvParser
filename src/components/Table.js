import React, {Component} from 'react'
import row from './row'
import './Table.css'
import HeaderClass from './HeaderClass'
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


    render(){
        const {data, fields, updateRows} = this.props
        return(
          <div>
             <table>  
               <thead>   
                <tr className="csv-field">
                  {fields && !data ? <HeaderClass fields={fields} /> : null}
                </tr>         
               </thead>    
              <tbody>
                {data && data ? this.createRows(data, fields, updateRows) : null}
              </tbody>
            </table>
          </div>
        )
    }
}


