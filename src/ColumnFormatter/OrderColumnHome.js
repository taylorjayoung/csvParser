import React, {Component} from 'react'
import { Icon, Table } from 'semantic-ui-react'
import Papa from 'papaparse'
import HeaderList from './HeaderList'
import { CSVLink } from "react-csv";

 

export default class OrderColumnHome extends Component {
  constructor(){
    super()
    this.state = {
      fileUploaded: null,
      fields: null,
      data: null,
      downloadReady: null
    }
    this.updateData = this.updateData.bind(this)
    this.onChange = this.onChange.bind(this)
    this.reorderData = this.reorderData.bind(this)
  }

    
  onChange(e) {
    this.setState({
        file:e.target.files[0],
        fileUploaded: true
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

      const fieldObjectsForDownload = cleanBlankFields.map(textField => {
        idCounter++;
        return {label: textField, key: idCounter};
      })
      this.setState({
        data: data,
        fields: fields,
        downloadHeaders: fieldObjectsForDownload
      });
   }

  updateHeaderState = e => {
    
  }

  setData = (e, itemList) => {
    e.preventDefault()
    let idCounter = 0
    const orderedFields = itemList.map( item => {
      idCounter++
      return {label: item, key: idCounter}
    })
    const reorderedData = this.reorderData(orderedFields)
    debugger
    this.setState({
      data: reorderedData,
      downloadHeaders: orderedFields,
      downloadReady: true
    })

  }

  reorderData = (fields) => {
    const newData = []
    const data = this.state.data
    for(let i = 0; i < data.length; i++){
      let newObj = {}
      for(let j = 0; j < fields.length; j++){
        let currField = fields[j]
        newObj[currField.label] = data[i][currField.label]
      }
      newData.push(newObj)
    }
   return newData
    
  }

  exportCSV = () => {
    const fieldObjectsForDownload = this.state.fieldObjectsForDownload
    return(
      <CSVLink className='export-button' data={this.state.data} headers={fieldObjectsForDownload}>
        Export
      </CSVLink>
      )
  }

  render(){
    const { fileUploaded, data, file, fields, downloadReady } = this.state
    const {setData, exportCSV } = this
    return( 
      <div>
        <div>
        { !fileUploaded ? this.displayForm() : null}
        { fileUploaded && !data ? this.getData(file) : null }
        { downloadReady ? exportCSV() : null }
        </div>
        <div>
        {data && fields ? 
        <HeaderList 
          data={data} 
          fields={fields} 
          setHeaderState={this.updateHeaderState}
          setData={setData}
          />  : null}
      </div>
    </div>
    )
  }
}
 