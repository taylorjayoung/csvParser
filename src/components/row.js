import React from 'react'


export const row = (data, fields, callback) =>{
    //the data variable input here is one row of the parsed excel 
    debugger
    //checks whether the row is empty 
    let empty = checkEmpty(data, fields)

    //if row is not empty, enter if statement
    if(!empty){
        //set the values of the rows fields in an array to ass to the callback
        const fields = [data['Property'], data['Agency'],data['Advertiser/Product'],data['Air Date'],data['Aired Length'],data['Order Product Description'],data['Aired Time '],data['Aired Ad-ID'],data['Rate'],data['Rev Code 2'],data['Field 1'],data['Program'],data['Start Time'],data['Time Period'],data['Deal/Order #'],data['Line #']]
        //'makeRow()' creates an array of html table rows to return to the Table component
        const jsx = makeRow(fields)
        callback(fields)
        return jsx
    } else return null
}

export default row

        
const checkEmpty = (data, fields) => {
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