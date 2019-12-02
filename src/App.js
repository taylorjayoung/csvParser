import React, {Component} from 'react';
import './App.css';
import CSVParser from './CSVParser/CSVParser'
import OrderColumnHome from './ColumnFormatter/OrderColumnHome'
import ParserDropdown from './ParserDropdown'


class App extends Component {
  constructor(){
    super()
    this.state = {
      instructions: 'Choose From Dropdown',
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
          <div className="text-box">
            <h1 className="heading-primary">
              <span class="heading-primary-main">MVM Toolshed</span>
              <span class="heading-primary-sub">CSV Parser</span>
            </h1>
          </div>
          <div className="body-wrapper">
            {this.state.selection === 1 ? <CSVParser tableFx={this.renderTableStyle}/>  : null}
          </div>
        </div>
    );
  }
}

export default App







const instPresent = {
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
