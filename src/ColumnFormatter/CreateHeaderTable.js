import React, {Component} from 'react'
import { Icon, Table } from 'semantic-ui-react'

 

class HeaderTable extends Component {


createHeaders = (fields, callback, stateSet) => { 
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
    if(!this.props.cleanRows) stateSet();
    return headers
  }

  renderHeaders = (fields, updateHeaderRequirement, setHeaderStateTrue) => {
    return(        
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell> Field Name </Table.HeaderCell>
          <Table.HeaderCell> Required? </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { fields ? this.createHeaders(fields, updateHeaderRequirement, setHeaderStateTrue) : null}
      </Table.Body>
    </Table>
    )
  }

  render(){
    return(

    )
  }
}

}



export default HeaderTable

