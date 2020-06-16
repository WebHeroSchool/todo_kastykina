import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './InputItem.module.css';

class InputItem extends React.Component {
  state = {
    inputValue: '',
    isError: false,
    textOfError: ''
  };

  inputValueChange = event => this.setState({ inputValue: event.target.value });

  onSubmit= (event) => { 
      event.preventDefault();
     
      const {onClickAdd, items} = this.props;
      const {inputValue} = this.state;

      let error = false;
      items.forEach(item=> {
        if(item.value.toLowerCase() === inputValue.toLowerCase()) {
            error = true
        }
      });
       if(inputValue ==='' || error) {
          this.setState({
            isError: true,
            textOfError: error ? "This case is already  in the list, enter another task, please!": "Please, fullfill the field!",
          });
        }
       else {
          this.setState({
              inputValue: '',
              isError: false,
              textOfError: ''
          });
          onClickAdd(inputValue); 
        }
    };

  
  render() {
  const { isError, textOfError} = this.state;
  
    return (
        <form
           className ={styles.itemInput}
           onSubmit={this.onSubmit}>
            <TextField
                error = {isError}
                id="standard-full-width"
                label=""
                style={{ margin: 0}}
                placeholder= "What needs to be done?"
                helperText = {textOfError}
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