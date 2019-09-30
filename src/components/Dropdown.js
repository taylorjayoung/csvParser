import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: "Accuweather", value: 1 },
  { key: 2, text: "Antenna", value: 2 },
  { key: 3, text: "BounceTV", value: 3 },
  { key: 4, text: "CBS Sports", value: 4 },
  { key: 5, text: "CourtTV", value: 5 },
  { key: 6, text: "EscapeTV", value: 6 },
  { key: 7, text: "GritTV", value: 7 },
  { key: 8, text: "Justice Network", value: 8 },
  { key: 9, text: "Laff", value: 9 },
  { key: 10, text: "MLB", value: 10 },
  { key: 11, text: "Newsy", value: 11},
  { key: 12, text: "NHL", value: 12},
  { key: 13, text: "Quest Network", value: 13},
  { key: 14, text: "Stadium", value: 14},
  { key: 15, text: "ThisTV", value: 15}
]

const NetworkDropdown = (props) => (
  <div>
   <Dropdown clearable options={options} placeholder={"Select Network"} onChange={props.setNetwork}/>
  </div>
)

export default NetworkDropdown
