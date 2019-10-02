import React, {Component} from 'react';
import './App.css';
import CSVParser from './components/CSVParser'
import OrderColumnHome from './ColumnFormatter/OrderColumnHome'
import ParserDropdown from './ParserDropdown'

class App extends Component {
  constructor(){
    super()
    this.state = {
      instructions: 'Select a Functionality',
      selection: null
    }
  }
  
  setFunction = (e, data) => {
    e.preventDefault()
    const selection = data.options[data.value - 1]
    console.log(this.state.instructions.length)
    this.setState({
      selection: selection.value,
      instructions: ''
    }, () =>     console.log(this.state.instructions.length))
  }



  render(){
    const instPresent = {
      border: '1px solid black',
      width: '200px'
    }
    const instructionsStyle = this.state.instructions.length > 0 ? instPresent : null

    return (
      <div className="App">
        <div className="input-wrapper" style={instructionsStyle}>
          <div className="instructions-wrapper" style={instructionsStyle}> 
           {!this.state.selection ? this.state.instructions : null}
          </div>
          <div className="dropdown-wrapper" style={instructionsStyle}>
            {!this.state.selection ? <ParserDropdown setFunction={this.setFunction} /> : null}
          </div>
          <div className="body-wrapper">
            {this.state.selection === 1 ? <CSVParser />  : null}
            {this.state.selection === 2 ?<OrderColumnHome /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;





