import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './ButtonExample.css'

const SchedLengthNextButton = ( handleNext) => (
  <div className="button-div">
    <Button animated onClick={handleNext}>
      <Button.Content visible>Click Me When Schedule Length Is Selected</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
  </div>
)

export default SchedLengthNextButton
