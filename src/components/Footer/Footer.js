import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Footer.module.css';

const Footer = ({ count }) => (
    <div className={styles.wrap}>
         <Button size="medium" >
         {count} items left
        </Button>
        <div className={styles.filter}>
            <Button size="medium" >
             All
            </Button>
            <Button size="medium" >
             Active
            </Button>
            <Button size="medium" >
             Completed
            </Button>
        </div>
        <Button size="medium" >
         Clear Completed
        </Button>

        
    </div> 
);

Footer.propTypes = {
    count: PropTypes.number.isRequired
};

export default Footer; 