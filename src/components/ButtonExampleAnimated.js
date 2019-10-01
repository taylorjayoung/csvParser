import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonExampleAnimated = (setFieldsHandler, resetState) => (
  <div>
    <Button animated onClick={setFieldsHandler}>
      <Button.Content visible>Done Selecting Fields?</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right' />
      </Button.Content>
    </Button>
    <Button animated='vertical' onClick={resetState}>
      <Button.Content visible>Clear File</Button.Content>
      <Button.Content hidden>
        <Icon name='folder open' />
      </Button.Content>
    </Button>
  </div>
)

export default ButtonExampleAnimated
