import React from 'react'

export function setNetwork(e, data){
  e.preventDefault()
  const network = data.options[data.value - 1]
  debugger
  if(this.state.downloadHeaders){
    this.resetToSecondState()
  }
  
  if( !network ){
    this.setState({
      network: network,
      katz: null,
      instructions: "Select a Network"
    })
  } else {
    this.setState({
      network: network,
      katz: network.katz,
      instructions: "Select a Version Number"
    })
  }
}

export function onChange(e){
  this.setState({
      file:e.target.files[0],
      fileUploaded: true
  })
}



export function updateData(result) {
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
  if(this.state.katz){
    this.setState({
      data: data,
      fields: fieldObjects,
      downloadHeaders: fieldObjectsForDownload,
      instructions: 'Click on "Air Date" Field'
    });
  } else {
    this.setState({
      data: data,
      fields: fieldObjects,
      downloadHeaders: fieldObjectsForDownload,
      instructions: 'Click "Export" to Download CSV'
    });
  }

}


export function setMasterCsv(rowData){
  this.setState({
    data: rowData,
    rowsSet: true
  })
}



export function setVersion(e, data){
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
  })
}
}

export function updateAirDateRequirement(e, id, header ){
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

export function displayForm(){
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

export function setHeaderStateTrue(){
  this.setState({
    headersSet: true
  })
}

export function addError(error){
  this.state.errors.push(error)
}

export function setFieldsHandler(e){
  e.preventDefault()
  this.setState({
    fieldsEstablished: true,
    instructions: `Row Count: ${this.state.data.length}`
  })
}

export function resetState(){
  this.setState(initialState)
}

export function resetToSecondState(){
  this.setState(secondState)
}

export function handleNext(e){
  e.preventDefault()
  if(this.state.airDateSelected){
    const clearedRequirements = this.state.fields.map( header => {
      header.required = false
      return header
    })
    this.setState({
      schedLengthSelected: true,
      headers: clearedRequirements
    })
  }
  else{
    this.setState({
      cellTitle: 'Schedule Length',
      airDateSelected: true
    })
  }
}



const initialState = {
  file:null,
  fileUploaded: false,
  data: null,
  fields: null,
  network: null,
  csvData: [],
  csvReady: null,
  instructions: "Select A Network",
  requiredHeaders: null,
  fieldObjectsForDownload: null,
  headersSet: false,
  rowsSet: false,
  downloadHeaders: null,
  errors: [],
  table: null,
  version: null,
  cellTitle: 'Air Date?',
  currentAirDate: null,
  airDateSelected: null,
  schedLengthSelected: null,
  alert: null,
  headerSelected: null
}

const secondState = {
  file:null,
  fileUploaded: false,
  data: null,
  fields: null,
  csvData: [],
  csvReady: null,
  requiredHeaders: null,
  fieldObjectsForDownload: null,
  headersSet: false,
  rowsSet: false,
  downloadHeaders: null,
  errors: [],
  currentAirDate: null,
  version: null,
  cellTitle: 'Air Date?'
}

