import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './InputItem.module.css';

class InputItem extends React.Component {
  state = {
    inputValue: '',
  };

  inputValueChange = event => this.setState({ inputValue: event.target.value });

  onSubmit= (event) => { 
      event.preventDefault();
      this.props.onClickAdd(this.state.inputValue);  

      this.setState ({
      inputValue: ''
   });
  };

  
  render() {
   const emptyField= this.props.isEmptyField;
  
    return (
        <form
           className ={styles.itemInput}
           onSubmit={this.onSubmit}>
            <TextField
                error = {emptyField ? true : false}
                id="standard-full-width"
                label=""
                style={{ margin: 0}}
                placeholder= "What needs to be done?"
                helperText = { emptyField ? "Пожалуйста, заполните поле!" : ""}
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,}}
                value={this.state.inputValue}
                onChange ={ this.inputValueChange }
          />
        <button
            className = { styles.button}>
            ADD
        </button>
          
        </form>
        );
  }
};


export default InputItem;