import React from 'react';
import Item from '../Item/Item';
import PropTypes from 'prop-types';
import styles from './ItemList.module.css';

const ItemList = ({ items, onClickDone, onClickDelete, allItems }) => {
 
 
  
  if(allItems === 0) {
    return(
      <div className = {styles.itemsNull}></div>
    )
    }
   else {
      return(<ul>
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