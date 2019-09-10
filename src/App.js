import React from 'react';
import './App.css';
import CSVParser from './components/CSVParser'

function App() {
  return (
    <div className="App">
      <div className="input-wrapper">
        <CSVParser />
      </div>
    </div>
  );
}

export default App;
