import React, {Component} from 'react';
import { nullLiteral } from '@babel/types';
import Table from './Table';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";
import NetworkDropdown from './Dropdown'

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
          csvReady: null
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
    setNetwork = (e) => {
      e.preventDefault()
      console.log(e.target.value)
      this.setState({
        network: e.target.value
      })
    }

    render(){
      const { data, fields, fileUploaded, file } = this.state
        return(
            <div className='table-wrapper'>
               <NetworkDropdown setNetwork={this.setNetwork}/>
                <h1>Upload file</h1>
                {this.state.csvReady ? this.exportCSV() : null}
                <form className='input-form' onSubmit={this.onFormSubmit}x>
                    <input 
                    className='input-field'
                    type='file' 
                    accept='.csv, .xlsx, .xsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' 
                    onChange={this.onChange}
                    />
                </form>
                {fileUploaded && !this.state.data ? this.getData(file) : null}
                {data && fields ? <Table data={data} fields={fields} updateRows={this.pushRowToMasterCsv} />  : null}
            </div>
        )
    }
}

