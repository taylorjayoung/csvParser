import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

 

const headerRow = (fields, cb) => { 
      //take in the fields state from props and create headers for csv
      const headers = []
      for(const field of fields){
        const header = (<Table.HeaderCell>{field}</Table.HeaderCell>)
        headers.push(header)
      }
      return headers
}



export default headerRow
