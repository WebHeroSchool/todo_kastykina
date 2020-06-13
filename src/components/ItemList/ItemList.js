import React from 'react';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import styles from './ItemList.module.css';

class ItemList extends React.Component {
  render() {
    const { items, onClickDone, onClickDelete } = this.props;
    
    
    return (items.length === 0 ? <div className = {styles.itemsNull}></div> : 
    <ul className={styles.ul}>
      { items.map(item => <li key = {item.id} className = {styles.list} >
         <Item 
           value = { item.value }
           isDone={item.isDone}
           id={item.id}
           onClickDone = {onClickDone} 
           onClickDelete= {onClickDelete} />
          </li>)
      } </ul>);
  }
}
ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onClickDone:PropTypes.func.isRequired,
  onClickDelete:PropTypes.func.isRequired
};

export default ItemList;