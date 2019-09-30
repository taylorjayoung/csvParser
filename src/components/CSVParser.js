import React, {Component} from 'react';
import { nullLiteral } from '@babel/types';
import Table from './Table';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";
import NetworkDropdown from './NetworkDropdown'
import './CSVParser.css'

export default class CSVParser extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          fileUploaded: false,
          data: null,
          csvFields: [],
          network: null,
          csvData: [],
          csvReady: null,
          instructions: "Select a Network",
          fieldsEstablished: null
        }
        this.onChange = this.onChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.pushRowToMasterCsv = this.pushRowToMasterCsv.bind(this)
      }

    onChange(e) {
        this.setState({
            file:e.target.files[0],
            fileUploaded: true
        })
    }


    getData(file) {
        const data = Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: this.updateData
        })
    }

    updateData(result) {
        const data = result.data;
        this.setState({
          data: data,
          csvReady: true,
          fields: Object.keys(data[0])
        }, () => console.log('updated state for csv data',this.state));
    }
    

    //unparse csv data for export
    csvUnparse(){
      const csv = Papa.unparse({
        "fields": this.state.fields,
        "data": this.state.csvData
      });
      
      console.log(csv)
    }

    pushRowToMasterCsv(row){
        this.state.csvData.push(row)
    }

    exportCSV = () => {
      return(
        <CSVLink data={this.state.csvData} headers={this.state.csvFields}>
          Export
        </CSVLink>
        )
    }

    downloadCSV = (e) => {
      e.preventDefault()
      this.csvUnparse()
    }
    setNetwork = (e, data) => {
      e.preventDefault()
      const network = data.options[data.value - 1]
      
      if( !network ){
        this.setState({
          network: network,
          instructions: "Select a Network"
        })
      } else {
        this.setState({
          network: network,
          instructions: "Upload a Prelog"
        })
      }

    }

    displayForm = () => {
      return(
      <form className='input-form' onSubmit={this.onFormSubmit}x>
          <input 
          className='input-field'
          type='file' 
          accept='.csv, .xlsx, .xsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
          onChange={this.onChange}
          />
      </form>)
    }

    render(){
      const { data, fields, fileUploaded, file, csvReady, network, instructions, fieldsEstablished } = this.state
        return(
            <div className='csv-wrapper'>
              <div className='instructions-div'>
                <h1>{ instructions }</h1>
              </div>
              <div className='network-dropdown-div'>
               <NetworkDropdown setNetwork={this.setNetwork}/>
               { csvReady ? this.exportCSV() : null}
              </div>
              <div className='file-upload-div'>
               { network ? this.displayForm() : null}
              </div>        
              { fileUploaded && !this.state.data ? this.getData(file) : null}
           
            </div>
        )
    }
}

