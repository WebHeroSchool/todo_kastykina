import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Footer.module.css';

class Footer extends React.Component {
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'}
    ];
 render() {
 const { count, onFilterChange, onClearCompleted} = this.props;
    const buttons = this.buttons.map(({name, label}) => {
        return(
            <Button size="medium"
                    className={styles.active}
                    key={name}
                    onClick={() => onFilterChange(name)}>
             {label}
            </Button>
           
        );
    })



return(<div className={styles.wrap}>
        <Button size="medium" >
          {count} items left
        </Button>
        <div className={styles.filter} >
          {buttons}
        </div>
        <Button size="medium" 
                onClick={() => onClearCompleted()
                }>
          Clear Completed
          </Button>
        </div>
);
}

}


Footer.propTypes = {
    count: PropTypes.number.isRequired
};

export default Footer; 