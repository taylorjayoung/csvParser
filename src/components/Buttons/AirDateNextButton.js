import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './ButtonExample.css'

const AirDateNextButton = (buttonInstructions, handleNext, resetState) => (
  <div className="button-div">
    <Button animated onClick={handleNext}>
      <Button.Content visible>{buttonInstructions}</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
  </div>
)

export default AirDateNextButton
