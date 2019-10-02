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
    this.setState({
      selection: selection.value
    })
  }

  render(){
    return (
      <div className="App">
        <div className="input-wrapper">
          {!this.state.selection ? this.state.instructions : null}
          {!this.state.selection ? <ParserDropdown setFunction={this.setFunction} /> : null}
          {this.state.selection === 1 ? <CSVParser />  : null}
          {this.state.selection === 2 ?<OrderColumnHome /> : null}
          
        </div>
      </div>
    );
  }
}

export default App;




