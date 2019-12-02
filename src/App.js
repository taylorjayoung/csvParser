import React, {Component} from 'react';
import './App.css';
import CSVParser from './CSVParser/CSVParser'
import OrderColumnHome from './ColumnFormatter/OrderColumnHome'
import ParserDropdown from './ParserDropdown'


class App extends Component {
  constructor(){
    super()
    this.state = {
      instructions: 'Select a Network',
      selection: 1,
      tableDisplayed: null
    }
  }
  
  setFunction = (e, data) => {
    e.preventDefault()
    const selection = data.options[data.value - 1]
    this.setState({
      selection: selection.value,
      instructions: ''
    })
  }

  renderTableStyle = () => {
    this.setState({tableDisplayed: true})
  }


  render(){

    const instructionsStyle = this.state.instructions.length > 0 ? instPresent : null
    const appStyle = this.state.tableDisplayed ? tableAppStyle : defaultAppStyle

    return (
      <div className="App" style={appStyle}>
        <div className="input-wrapper" style={instructionsStyle}>
          <div className="instructions-wrapper" style={instructionsStyle}> 
           {!this.state.selection ? this.state.instructions : null}
          </div>
          {/* depricated, originally used when csv-parser has two use-cases

          <div className="dropdown-wrapper" style={instructionsStyle}>
            {!this.state.selection ? <ParserDropdown setFunction={this.setFunction} table={this.state.tableDisplayed} /> : null}
          </div>
          */}
          <div className="body-wrapper">
            {this.state.selection === 1 ? <CSVParser tableFx={this.renderTableStyle}/>  : null}
            {this.state.selection === 2 ?<OrderColumnHome /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App







const instPresent = {
  border: '1px solid black',
  width: '200px'
}
const tableAppStyle = {
  height: '50%',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
  position: 'absolute',
  top: '0',
  alignItems: 'center',
  resize: 'both',
  overflow: 'none',
  borderRadius: '5px'
}

const defaultAppStyle = {
  height: '50%',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  resize: 'both',
  overflow: 'none',
  borderRadius: '5px'
}
