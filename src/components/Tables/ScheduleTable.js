import React, {Component} from 'react'
import row from '../../CSVParser/row'
import './Table.css'
import { Icon, Table } from 'semantic-ui-react'
export default class ResultTable extends Component {
  componentDidMount(props){
  }
    //iterate over each row and apply method logic
    createRows = (data, fields, setCsvData, addError) => {
        const rows = []
        for(let i = 0; i < data.length; i++){
          const rowData = data[i]
          const result = row(rowData, fields, addError, i)
          if(result) {
            rows.push(result)
          }
        }
        setCsvData(rows)
        return null
    }

    createHeaders = (fields, callback, stateSet) => {
      //take in the fields state from props and create headers for csv
      const headers = []
      for(const field of fields){
        const iconVal = field.required  ? 'checkmark': 'close'
        const cellText = field.required ? 'Sched Length Field' : 'Not Sched Length Field'
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
      if(!this.props.cleanRows) stateSet();
      return headers
    }

    renderHeaders = (fields, updateSchedLengthId, setHeaderStateTrue, cellTitle) => {
      return(        
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> Field Name </Table.HeaderCell>
            <Table.HeaderCell> {cellTitle} </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { fields ? this.createHeaders(fields, updateSchedLengthId, setHeaderStateTrue) : null}
        </Table.Body>
      </Table>
      )
    }
  
    render(){
        const {
          data, 
          fields, 
          setCsvData, 
          addError, 
          cleanRows, 
          rowsSet,
          fieldsEstablished,
          updateSched, 
          setHeaderStateTrue,
          cellTitle } = this.props

        return(
          <div className="data-table">
            { cleanRows && !rowsSet ? this.createRows(data, fields, setCsvData, addError) : null}
            { fieldsEstablished ? null : this.renderHeaders(fields, updateSched, setHeaderStateTrue, cellTitle)}
          </div>
        )
    }
}


