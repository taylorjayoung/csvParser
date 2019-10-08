import React from 'react'

export function setNetwork(e, data){
  e.preventDefault()
  const network = data.options[data.value - 1]
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
  const versionData = data.map( d => {
    d['Version'] = this.state.version.value
    return d
  })
  const fields = Object.keys(data[0])
  const cleanBlankFields = fields.filter(f => f !== '')
  let idCounter = 0

  const fieldObjects = cleanBlankFields.map(textField => {
    idCounter++;
    return {header: textField, required: false, id: idCounter};
  })
  idCounter++;
  fieldObjects.push({header: 'Version', required: false, key: idCounter})

  const fieldObjectsForDownload = cleanBlankFields.map(textField => {
    idCounter++;
    return {label: textField, key: idCounter};
  })
  idCounter++
  fieldObjectsForDownload.push({label: 'Version', key: idCounter})
  
  if(this.state.katz){
    this.setState({
      data: data,
      fields: fieldObjects,
      downloadHeaders: fieldObjectsForDownload,
      instructions: 'Click on "Air Date" Field'
    });
  } else {
    this.setState({
      data: versionData,
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

export function updateSched(e, id, header){
  e.preventDefault()

  let schedLengthId = this.state.schedLengthId
  if( schedLengthId && (schedLengthId !== id) ){
    this.setState({alert: true})
    return
  }
    
  else if( schedLengthId && (schedLengthId === id )){
    schedLengthId = null
  }

  else if( !schedLengthId ){
    schedLengthId = id
  }

  const updatedHeaders = this.state.fields.map( header => { 
      if(header.id === id){
        header.required = !header.required
      }; 
      return header
  });
  
  this.setState({
    fields: updatedHeaders,
    schedLengthId: schedLengthId
  })
}

export function updateAirDateRequirement(e, id, header ){
  e.preventDefault()

  let airdDateId = this.state.airdDateId
  if( airdDateId && (airdDateId !== id) ){
    this.setState({alert: true})
    return}
    
  else if( airdDateId && (airdDateId === id )){
    airdDateId = null
  }

  else if( !airdDateId ){
    airdDateId = id
  }


  const updatedHeaders = this.state.fields.map( header => { 
    if(header.id === id){
      header.required = !header.required
    }; 
    return header
  });
  
  this.setState({
    headers: updatedHeaders,
    airdDateId: airdDateId
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
    const dateIdx = this.state.airdDateId - 1
    const schedIdx = this.state.schedLengthId - 1
    const data = this.state.data
    const dataKeys = Object.keys(data[0])
    const dateCol = dataKeys[dateIdx]
    const schedCol = dataKeys[schedIdx] 
    
    data.map( data => {
      let date = data[dateCol].split('/')
      let month = date[0].length < 2 ? `0${date[0]}` : date[0]
      let day = date[1].length < 2 ? `0${date[1]}` : date[1]
      let year = date[2] < 4 ? `20${date[2]}` : date[2]
      const reformattedDate = `${month}/${day}/${year}`
      data[dateCol] = reformattedDate
      //reformat time
      let length = data[schedCol]
      const time = length.split(':')
      const min = parseInt(time[0]) * 60
      const sec = parseInt(time[1])
      let total = min + sec
      if(!min){ 
        total = sec
      }
      data[schedCol] = total
 
      return data
    })
    this.setState({
      schedLengthSelected: true,
      fieldsEstablished: true,
      instructions: 'Click "Export" to Download CSV.'
    })
  }
  else{
    const fields = this.state.fields.map(field => {
      field.required = false
      return field
    })
    this.setState({
      cellTitle: 'Schedule Length',
      instructions: 'Click on "Schedule Length" to Select.',
      airDateSelected: true,
      fields: fields 
    })
  }
}

export function formatAirDateAndSchedLength(date, sched){
  //format here
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

