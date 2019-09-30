import React, {Component} from 'react'
import row from './row'
import './Table.css'
import { Icon, Table } from 'semantic-ui-react'
export default class ResultTable extends Component {
    constructor(props){
      super(props)
      this.state = {
        headersSet: null
      }
    }
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

    createHeaders = (fields, callback) => { 
      //take in the fields state from props and create headers for csv
      const headers = []
      for(const field of fields){
        const iconVal = field.required  ? 'checkmark': 'close'
        const cellText = field.required ? 'Required' : 'Not Required'
       
       
        if(field.required){
          const row = (
            <Table.Row positive  key={field.id} onClick={(e) => callback(e, field.id, field.header)}>
              <Table.Cell>{field.header}</Table.Cell>
              <Table.Cell>
                <Icon name={iconVal} />
                 {cellText}
              </Table.Cell>
             </Table.Row>
          ) 
          headers.push(row)

        } else {
          const row = (
            <Table.Row negative  key={field.id} onClick={(e) => callback(e, field.id, field.header)}>
              <Table.Cell>{field.header}</Table.Cell>
              <Table.Cell>
                <Icon name={iconVal} />
                 {cellText}
              </Table.Cell>
             </Table.Row>
            )
            headers.push(row)
        }

      }
      return headers
    }

    render(){
        const {data, fields, updateRows, updateHeaderRequirement} = this.props
        const { headersSet } = this.state
        return(
          <div className="data-table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Field Name </Table.HeaderCell>
              <Table.HeaderCell> Required? </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { fields ? this.createHeaders(fields, updateHeaderRequirement) : null}
          </Table.Body>
        </Table>
        { headersSet ? this.createRows(data, fields, updateRows) : null}
          </div>
        )
    }
}


