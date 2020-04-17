import React from 'react';
import TextField from '@material-ui/core/TextField';

const InputItem = () => ( <div>
      <TextField
          id="standard-full-width"
          label=""
          style={{ margin: 0}}
          placeholder="What needs to be done?"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
</div>
);

export default InputItem;