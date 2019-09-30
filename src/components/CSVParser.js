import React, {Component} from 'react';
import { nullLiteral } from '@babel/types';
import ResultTable from './ResultTable';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";
import NetworkDropdown from './NetworkDropdown'
import ButtonExampleAnimated from './ButtonExampleAnimated'
import './CSVParser.css'


export default class CSVParser extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file:null,
          fileUploaded: false,
          data: null,
          fields: null,
          network: null,
          csvData: [],
          csvReady: null,
          instructions: "Select a Network",
          fieldsEstablished: null,
          requiredHeaders: null,
          fieldObjectsForDownload: null
        }
        this.onChange = this.onChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.pushRowToMasterCsv = this.pushRowToMasterCsv.bind(this)
        this.updateHeaderRequirement = this.updateHeaderRequirement.bind(this)
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
        const fields = Object.keys(data[0])
        let idCounter = 0
        const fieldObjects = fields.map(textField => {
          idCounter++;
          return {header: textField, required: false, id: idCounter};
        })
        const fieldObjectsForDownload = fields.map(textField => {
          idCounter++;
          return {label: textField, key: idCounter};
        })

        this.setState({
          data: data,
          fields: fieldObjects,
          csvReady: true
        });
    }
    


    pushRowToMasterCsv(row){
        this.state.csvData.push(row)
    }

    exportCSV = () => {
      const fieldObjectsForDownload = this.state.fieldObjectsForDownload
      return(
        <CSVLink className='export-button' data={this.state.data.slice(1, 5) } headers={fieldObjectsForDownload}>
          Export
        </CSVLink>
        )
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
    updateHeaderRequirement = (e, id, header ) => {
      e.preventDefault()
      const headerIdx= this.state.fields.map(function(e) { return e.header; }).indexOf(header);
      const updatedHeaders = this.state.fields.map(function(header) { 
         if(header.id === id){
           header.required = !header.required
         }; 
        });
        this.setState({
          headers: updatedHeaders
        })
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
              </div>
              <div className='file-upload-div'>
               { network && !fileUploaded ? this.displayForm() : null}
               { network && fields ? this.exportCSV() : null}
              </div>        
              { fileUploaded && !data ? this.getData(file) : null }
              <div>
                {data && fields ? 
                <ResultTable 
                  data={data} 
                  fields={fields} 
                  updateRows={this.pushRowToMasterCsv} 
                  updateHeaderRequirement={this.updateHeaderRequirement} 
                  />  : null}
              </div>
            </div>
        )
    }
}

