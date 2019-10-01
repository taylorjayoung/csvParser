import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: "Clear Space From CSV", value: 1 },
  { key: 2, text: "Select Specific CSV Rows", value: 2 },
]

const ParserDropdown = (props) => (
   <Dropdown clearable options={options} placeholder={"Select Option"} onChange={props.setFunction}/>
)

export default ParserDropdown
