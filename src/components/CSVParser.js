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
          fieldObjectsForDownload: null,
          headersSet: false,
          rowsSet: false
        }
        this.onChange = this.onChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.setMasterCsv = this.setMasterCsv.bind(this)
        this.updateHeaderRequirement = this.updateHeaderRequirement.bind(this)
      }

    onChange(e) {
        this.setState({
            file:e.target.files[0],
            fileUploaded: true
        })

        console.log('file uploaded')
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
        const cleanBlankFields = fields.filter(f => f !== '')
        let idCounter = 0
        const fieldObjects = cleanBlankFields.map(textField => {
          idCounter++;
          return {header: textField, required: false, id: idCounter};
        })
        const fieldObjectsForDownload = cleanBlankFields.map(textField => {
          idCounter++;
          return {label: textField, key: idCounter};
        })
        this.setState({
          data: data,
          fields: fieldObjects,
          downloadHeaders: fieldObjectsForDownload
        });
        console.log('updated data')
    }
    


    setMasterCsv(rowData){
        this.setState({
          data: rowData,
          rowsSet: true
        })
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
      console.log('network set')

    }
    updateHeaderRequirement = (e, id, header ) => {
      e.preventDefault()
      const updatedHeaders = this.state.fields.forEach( header => { 
         if(header.id === id){
           header.required = !header.required
         }; 
        });
        this.setState({
          headers: updatedHeaders
        })

        console.log('update header')
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

    setHeaderStateTrue = () => {
      this.setState({
        headersSet: true
      })
      console.log('set header state')
    }

    render(){
      const { data, fields,rowsSet, fileUploaded, file, csvReady, network, instructions, fieldsEstablished, headersSet } = this.state
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
                  setCsvData={this.setMasterCsv} 
                  updateHeaderRequirement={this.updateHeaderRequirement} 
                  setHeaderStateTrue={this.setHeaderStateTrue}
                  cleanRows={headersSet}
                  rowsSet={rowsSet}
                  />  : null}
              </div>
            </div>
        )
    }
}

