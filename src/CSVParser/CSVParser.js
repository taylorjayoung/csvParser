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
  updateSched
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
        this.updateSched = updateSched.bind(this)
        this.renderAlert = this.renderAlert.bind(this)
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
        cellTitle,
        version,
        alert,
        katz,
        schedLengthSelected,
      } = this.state

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
        renderAlert,
        updateSched
      } = this 
  
      const displayNetworkDropdown = !network
      const displayVersionDropdown = network && !version 
      const displayFileUploadButton = version && !fileUploaded
      const displayExportButton = fieldsEstablished || schedLengthSelected
      const renderAirDate = fields && !fieldsEstablished && cellTitle === 'Air Date?' && katz
      const renderScheduleButton = fields && !fieldsEstablished && cellTitle === 'Schedule Length' && katz && !schedLengthSelected

      return(
        <>
            <div className="alert-div">
                { alert ? renderAlert() : null }
              </div>
            <div className='csv-wrapper'>
              { network ? <h1>{ version ? `${network.text}: Prelog Version ${version.value}` : network.text }</h1> : null}
              <div className='instructions-div'>
                {instructions}
                { renderAirDate ? AirDateNextButton(handleNext) : null}
                { renderScheduleButton ? SchedLengthNextButton(handleNext) : null}
              </div>
              
              <div className='file-upload-div'>
               { displayNetworkDropdown ? <NetworkDropdown setNetwork={setNetwork} /> : null }
               { displayVersionDropdown ? <VersionDropdown setVersion={setVersion} /> : null  }
               { displayFileUploadButton ? displayForm() : null}
               {!katz && data? this.exportCSV() : null }
               { displayExportButton ? this.exportCSV() : null}
              </div>        

              
              <div>
                { renderAirDate ? 
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
                  />  :  (data && fields && !schedLengthSelected && katz) ? 
                <ScheduleTable 
                    data={data} 
                    fields={fields} 
                    setCsvData={setMasterCsv} 
                    setHeaderStateTrue={setHeaderStateTrue}
                    cleanRows={headersSet}
                    rowsSet={rowsSet}
                    addError={addError}
                    fieldsEstablished={fieldsEstablished}
                    downloadHeaders={downloadHeaders}
                    cellTitle={cellTitle}
                    updateSched={updateSched}
                  /> : null }
              </div>

              { fileUploaded && !data ? this.getData(file) : null }

            </div>
        < />
        )
    }
}

