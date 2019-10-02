import React from 'react'


export const row = (data, fields, addError, idx) =>{
  //data is just info for one row 
  const errorObj = {}
  const cleanRow = {}
  let emptyFields = 0
  let repeatHeaderCount = 0
  for(let i = 0; i < fields.length; i++){ 
      let field = fields[i].header
      let fieldRequired = fields[i].required
      if(field === "" || !field ) continue
      let rowData = data[field]
      if(rowData === '') emptyFields++ 
      if(rowData === field) repeatHeaderCount++
      cleanRow[field] = rowData
  }
  if(emptyFields  >= 5) return null
  if((repeatHeaderCount / fields.length) > .5 )return null
  if(Object.keys(errorObj).length > 0) addError(errorObj)

  return cleanRow  
}

export default row

        
const checkRow = (data, fields) => {
    let emptyReqCols = []
    let emptyOptCols = []
    
    const propertyField = data['Property'].length !== 0
    const agencyField = data['Agency'].length !== 0
    const airDateField =data['Air Date'].length !== 0
    const airedLength = data['Aired Length'].length !== 0
    const productDescription = data['Order Product Description'].length !== 0
    const airedTime = data['Aired Time '].length !== 0
    const airedAdId = data['Aired Ad-ID'].length !== 0
    const rate = data['Rate'].length !== 0
    const revCode = data['Rev Code 2'].length !== 0
    const field1 = data['Field 1'].length !== 0
    const program = data['Program'].length !== 0
    const startTime = data['Start Time'].length !== 0
    const timePeriod = data['Time Period'].length !== 0
    const deal = data['Deal/Order #'].length !== 0
    const lineNumber = data['Line #'].length !== 0

    if(!propertyField) emptyReqCols.push('propertyField')
    if(!agencyField) emptyReqCols.push('agencyField')
    if(!airDateField) emptyReqCols.push('airDateField')
    if(!airedLength) emptyOptCols.push('airedLength')
    if(!productDescription) emptyOptCols.push('productDescription')
    if(!airedTime) emptyReqCols.push('airedTime')
    if(!airedAdId) emptyReqCols.push('airedAdId')
    if(!rate) emptyReqCols.push('rate')
    if(!revCode) emptyOptCols.push('revCode')
    if(!field1) emptyOptCols.push('field1')
    if(!program) emptyOptCols.push('program')
    if(!startTime) emptyReqCols.push('startTime')
    if(!timePeriod) emptyOptCols.push('timePeriod')
    if(!deal) emptyReqCols.push('deal')
    if(!lineNumber) emptyOptCols.push('lineNumber')
    
    //if current line is a page marker, skip it
    if(
      //Some lines are blank except for saying Page x in the Line # col
      data['Line #'].includes('Page') ||
      data['Property'] === 'Property'
      ){
        return true
    }
    //if there are any empty columns, log out the errors
    if(emptyReqCols.length > 0){
        console.log('The following columns are empty and cannot be processed : ', emptyReqCols)
        return true
    } else if (emptyOptCols.length > 0){
        console.log('There are missing optional columns on the row with Property: ', data['Property'], ' and Agency ', data['Agency']  )
        console.log('empty optional fields: ', emptyOptCols)
    } 
    
    return null
}


const makeRow =  fields => {
    let html = []
    fields.forEach( field => {
       html.push(<td>{field}</td>)
    })
    return <tr>{html}</tr>
}