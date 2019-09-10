import React, {Component} from 'react';
import { nullLiteral } from '@babel/types';
import Table from './Table';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";

export default class CSVParser extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          fileUploaded: false,
          data: null,
          csvFields: [
           'Property',
           'Agency',
           'Advertiser/Product',
           'Air Date',
           'Aired Length',
           'Order Product Description',
           'Aired Time ',
           'Aired Ad-ID',
           'Rate',
           'Rev Code 2',
           'Field 1',
           'Program',
           'Start Time',
           'Time Period',
           'Deal/Order #',
           'Line #'
            ],
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
          csvReady: true
        }, () => console.log('updated state for csv data',this.state.data));
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

    render(){
        return(
            <div className='table-wrapper'>
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
                {this.state.fileUploaded && !this.state.data ? this.getData(this.state.file) : null}
                {this.state.data ? <Table data={this.state.data} updateRows={this.pushRowToMasterCsv} />  : null}
            </div>
        )
    }
}

