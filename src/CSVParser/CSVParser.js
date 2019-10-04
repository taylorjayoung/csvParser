import React, {Component, Fragment} from 'react';
import { nullLiteral } from '@babel/types';
import ResultTable from '../components/Tables/ResultTable';
import Papa from 'papaparse'
import { CSVLink } from "react-csv";
import NetworkDropdown from './Dropdowns/NetworkDropdown'
import ButtonExampleAnimated from '../components/Buttons/ButtonExampleAnimated'
import AirDateNextButton from '../components/Buttons/AirDateNextButton'
import SchedLengthNextButton from '../components/Buttons/SchedLengthNextButton'
import VersionDropdown from './Dropdowns/VersionDropdown'
import Alert from 'react-bootstrap/Alert'
import './CSVParser.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduleTable from '../components/Tables/ScheduleTable';
import {initialState, secondState} from '../components/imports'

export default class CSVParser extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.onChange = this.onChange.bind(this)
        this.updateData = this.updateData.bind(this)
        this.setMasterCsv = this.setMasterCsv.bind(this)
        this.updateAirDateRequirement = this.updateAirDateRequirement.bind(this)
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
        const cleanBlankFields = fields.filter(f => f !== '')
        let idCounter = 0
  
        const fieldObjects = cleanBlankFields.map(textField => {
          idCounter++;
          return {header: textField, required: false, id: idCounter};
        })
        fieldObjects['Version Number'] = this.state.version.value
        const fieldObjectsForDownload = cleanBlankFields.map(textField => {
          idCounter++;
          return {label: textField, key: idCounter};
        })
        this.setState({
          data: data,
          fields: fieldObjects,
          downloadHeaders: fieldObjectsForDownload,
          instructions: 'Click on "Air Date" Field'
        });
        console.log('updated data')
    }
    
    formatKatzData(data){
      const results = []
      for(let i = 0; i < data.length; i++){

      }
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
        <CSVLink className='export-button' data={this.state.data} headers={fieldObjectsForDownload}>
          Export
        </CSVLink>
        )
    }



    setNetwork = (e, data) => {
      e.preventDefault()
      const network = data.options[data.value - 1]
      
      if(this.state.downloadHeaders){
        this.resetToSecondState()
      }
      if( !network ){
        this.setState({
          network: network,
          instructions: "Select a Network"
        })
      } else {
        this.setState({
          network: network,
          instructions: "Select a Version Number"
        })
      }
    }

    setVersion = (e, data) => {
      e.preventDefault()
      const version = data.options[data.value - 1]
      if( !version ){
        this.setState({
          version: version,
          instructions: "Select a Version"
        })
      } else {
        this.setState({
          version: version,
          instructions: "Upload a Prelog"
        }, () => console.log('version: ', this.state))
      }
    }

    updateAirDateRequirement = (e, id, header ) => {
      e.preventDefault()

      let headerSelected = this.state.headerSelected
      if( headerSelected && (headerSelected !== id) ){
        this.setState({alert: true})
        return}
        
      else if( headerSelected && (headerSelected === id )){
        headerSelected = null
      }

      else if( !headerSelected ){
        headerSelected = id
      }

      const updatedHeaders = this.state.fields.forEach( header => { 
         if(header.id === id){
           header.required = !header.required
         }; 
        });
        
        this.setState({
          headers: updatedHeaders,
          headerSelected: headerSelected
        })

    }

    displayForm = () => {
      return(
      <form className='input-form'>
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

    addError = (error) => {
      this.state.errors.push(error)
      console.log(this.state.errors)
    }

    setFieldsHandler = (e) => {
      e.preventDefault()
      this.setState({
        fieldsEstablished: true,
        instructions: `Row Count: ${this.state.data.length}`
      })
    }

    resetState = () => {
      this.setState(initialState)
    }

    resetToSecondState = () => {
      this.setState(secondState)
    }

    handleNext = (e) => {
      e.preventDefault()
      console.log(this.state.airDateSelected)
      if(this.state.airDateSelected){
        const clearedRequirements = this.state.fields.map( header => {
          header.required = false
          return header
        })
        debugger
        this.setState({
          schedLengthSelected: true,
          headers: clearedRequirements
        }, () => console.log(this.state.fields))
      }
      else{
        this.setState({
          cellTitle: 'Schedule Length',
          airDateSelected: true
        })
        //queue sched length
      }
    }


    renderAlert = () => {
      return(
      <Alert variant="danger" onClose={() => this.closeAlert()} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Only one field can be selected for Air Date. Unselect any previous selction before choosing another field.
        </p>
      </Alert>
      )
    }

    closeAlert = () => {
      this.setState({
        alert: false
      })
    }

    render(){
      const { 
        data, 
        fields,
        rowsSet, 
        fileUploaded, 
        file, 
        network, 
        instructions, 
        headersSet, 
        fieldsEstablished,
        downloadHeaders,
        table,
        cellTitle,
        version,
        alert,
        airDateSelected,
        schedLengthSelected } = this.state

      const {
        setMasterCsv, 
        addError, 
        setHeaderStateTrue, 
        updateAirDateRequirement, 
        setFieldsHandler,
        resetState,
        setNetwork,
        displayForm,
        setVersion, 
        handleNext,
        renderAlert} = this 


      return(
        <>
            <div className="alert-div">
                { alert ? renderAlert() : null }
              </div>
            <div className='csv-wrapper'>
              { network ? <h1>{ version ? `${network.text}: Prelog Version ${version.value}` : network.text }</h1> : null}
              <div className='instructions-div'>
                {instructions}
                {fields && !fieldsEstablished && cellTitle === 'Air Date?'  ? AirDateNextButton( 'Click Me When Air Date Is Selected', handleNext, resetState) : null}
                {fields && !fieldsEstablished && cellTitle === 'Schedule Length'  ? SchedLengthNextButton( 'Click Me When Schedule Length Is Selected', handleNext, resetState) : null}
                { fields && fieldsEstablished ? ButtonExampleAnimated(setFieldsHandler, resetState) : null }
              </div>
              
              <div className='file-upload-div'>
               { !network ? <NetworkDropdown setNetwork={setNetwork} /> : null }
               { network && !version ? <VersionDropdown setVersion={setVersion} /> : null  }
               { version && !fileUploaded ? displayForm() : null}
               { fieldsEstablished ? this.exportCSV() : null}
              </div>        
              { fileUploaded && !data ? this.getData(file) : null }
              <div>
                {data && fields && !airDateSelected ? 
                <ResultTable 
                  data={data} 
                  fields={fields} 
                  setCsvData={setMasterCsv} 
                  updateAirDateRequirement={updateAirDateRequirement} 
                  setHeaderStateTrue={setHeaderStateTrue}
                  cleanRows={headersSet}
                  rowsSet={rowsSet}
                  addError={addError}
                  fieldsEstablished={fieldsEstablished}
                  downloadHeaders={downloadHeaders}
                  cellTitle={cellTitle}
                  />  :  (data && fields && !schedLengthSelected) ? 
                <ScheduleTable 
                    data={data} 
                    fields={fields} 
                    setCsvData={setMasterCsv} 
                    updateAirDateRequirement={updateAirDateRequirement} 
                    setHeaderStateTrue={setHeaderStateTrue}
                    cleanRows={headersSet}
                    rowsSet={rowsSet}
                    addError={addError}
                    fieldsEstablished={fieldsEstablished}
                    downloadHeaders={downloadHeaders}
                    cellTitle={cellTitle}
                  /> : null }
              </div>
            </div>
        < />
        )
    }
}

