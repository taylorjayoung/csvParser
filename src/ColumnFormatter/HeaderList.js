import React from 'react';
import { List, arrayMove } from 'react-movable';

class HeaderList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items: props.fields
    }
  }

  renderList = () => {
    console.log('state: ', this.state)
    
    return(<List
      values={this.state.items}
      onChange={({ oldIndex, newIndex }) =>
        this.setState(prevState => ({
          items: arrayMove(prevState.items, oldIndex, newIndex)
        }))
      }
      renderList={({ children, props }) => <ol {...props}>{children}</ol>}
      renderItem={({ value, props }) => <li {...props}>{value}</li>}
    />)
  }


  

  

  render() {
    const { items } = this.state
    const { setData } = this.props 
    const { renderList } = this
    return (
      <div>
        { items ? renderList() : null }
        <button onClick={(e, items) => setData(e, this.state.items)}>Set Order</button>
      </div>
    );
  }
}

export default HeaderList