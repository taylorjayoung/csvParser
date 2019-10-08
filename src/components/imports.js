import React from 'react'

export const initialState = {
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
  airdDateId: null,
  schedLengthID: null

}

export const secondState = {
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

