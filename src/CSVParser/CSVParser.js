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
import { setNetwork,
  onChange,
  updateData,
  setMasterCsv,
  setVersion,
  updateAirDateRequirement,
  displayForm,
  setHeaderStateTrue,
  setFieldsHandler,
  resetState,
  resetToSecondState,
  handleNext,
} from './helpers/helpers'
export default class CSVParser extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.onChange = onChange.bind(this)
        this.updateData = updateData.bind(this)
        this.setMasterCsv = setMasterCsv.bind(this)
        this.setNetwork = setNetwork.bind(this)
        this.onChange = onChange.bind(this)
        this.updateData = updateData.bind(this)
        this.setMasterCsv = setMasterCsv.bind(this)
        this.setVersion = setVersion.bind(this)
        this.updateAirDateRequirement = updateAirDateRequirement.bind(this)
        this.displayForm = displayForm.bind(this)
        this.setHeaderStateTrue = setHeaderStateTrue.bind(this)
        this.setFieldsHandler = setFieldsHandler.bind(this)
        this.resetState = resetState.bind(this)
        this.resetToSecondState = resetToSecondState.bind(this)
        this.handleNext = handleNext.bind(this)
      }

     exportCSV(){
        const fieldObjectsForDownload = this.state.fieldObjectsForDownload
        return(
          <CSVLink className='export-button' data={this.state.data} headers={fieldObjectsForDownload}>
            Export
          </CSVLink>
          )
        }

      getData(file){
        const data = Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: this.updateData
        })
      }
    
    renderAlert(){
      return(
        <Alert variant="danger" onClose={() => this.closeAlert()} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Only one field can be selected for Air Date. Unselect any previous selction before choosing another field.
          </p>
        </Alert>
        )
      }

    closeAlert(){
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
  
      const displayNetworkDropdown = !network
      const displayVersionDropdown = network && !version
      const displayFileUploadButton = version && !fileUploaded
      const displayExportButton = fieldsEstablished
      const renderAirDateButton = fields && !fieldsEstablished && cellTitle === 'Air Date?'
      const renderAirDateTable = fields && !fieldsEstablished && cellTitle === 'Air Date?'
      const renderScheduleButton = fields && !fieldsEstablished && cellTitle === 'Schedule Length'

      return(
        <>
            <div className="alert-div">
                { alert ? renderAlert() : null }
              </div>
            <div className='csv-wrapper'>
              { network ? <h1>{ version ? `${network.text}: Prelog Version ${version.value}` : network.text }</h1> : null}
              <div className='instructions-div'>
                {instructions}
                { renderAirDateButton ? AirDateNextButton(handleNext) : null}
                { renderScheduleButton ? SchedLengthNextButton(handleNext) : null}
                { fields && fieldsEstablished ? ButtonExampleAnimated( setFieldsHandler, resetState) : null }
              </div>
              
              <div className='file-upload-div'>
               { displayNetworkDropdown ? <NetworkDropdown setNetwork={setNetwork} /> : null }
               { displayVersionDropdown ? <VersionDropdown setVersion={setVersion} /> : null  }
               { displayFileUploadButton ? displayForm() : null}
               { displayExportButton ? this.exportCSV() : null}
              </div>        

              
              <div>
                { renderAirDateTable ? 
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

              { fileUploaded && !data ? this.getData(file) : null }

            </div>
        < />
        )
    }
}

