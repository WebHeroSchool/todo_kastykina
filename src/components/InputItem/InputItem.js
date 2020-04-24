import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './InputItem.module.css';

class InputItem extends React.Component {
  state = {
    inputValue: '',
  };

  onButtonClick = () => {
    this.setState({
      inputValue: ''
    });

    this.props.onClickAdd(this.state.inputValue);
  } 

  render() {
    

    return (<div>
        <div
           className ={styles.itemInput}>
        <TextField         
           id="standard-full-width"
           label=""
           style={{ margin: 0}}
           placeholder="What needs to be done?"
           helperText=""
           fullWidth
           margin="normal"
           InputLabelProps={{
           shrink: true,}}
           value={this.state.inputValue}
           onChange ={event => this.setState({ inputValue: event.target.value })}
        />
        <button
            className = { styles.button}
            onClick={this.onButtonClick}> 
            ADD
        </button>
          
        </div>
          <span className={ styles.warning }>
            This field cannot be empty!
          </span>
        </div>);
  }
};


export default InputItem;