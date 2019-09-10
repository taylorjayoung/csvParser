import React, {Component} from 'react'
import row from './row'


export default class Table extends Component {

    //iterate over each row and apply method logic
    createRows = (data , callback) => {
        const rows = []
        data.forEach( rowData =>  {
            const result = row(rowData, callback)

            if(result) {
              rows.push(result)
            }
        })    
        return rows
    }

    render(){
        const {data, updateRows} = this.props
        return(
          <div>
             <table>  
               <thead>   
                <tr>
                  <th>Property</th>
                  <th>Agency</th>
                  <th>Advertiser/Product</th>
                  <th>Air Date</th>
                  <th>Aired Length</th>
                  <th>Order Product Description</th>
                  <th>Aired Time</th>
                  <th>Aired Ad-ID</th>
                  <th>Rate</th>
                  <th>Rev Code 2</th>
                  <th>Field 1</th>
                  <th>Program</th>
                  <th>Start Time</th>
                  <th>Time Period</th>
                  <th>Deal/Ord</th>
                  <th>Line #</th>
                </tr>         
               </thead>    
              <tbody>
                {this.createRows(data, updateRows)}
              </tbody>
            </table>
          </div>
        )
    }
}


