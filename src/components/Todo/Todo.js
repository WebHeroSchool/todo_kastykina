import React, { useState } from 'react';
import InputItem  from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';

import styles from './Todo.module.css';
  
const Todo = () => {
   let maxId = 4;
   const initialState = {
        items: [
           {
              value: 'Learn React',
              isDone: false,
              id: 1
           },
           {
               value: 'Read a book', 
               isDone: false,
               id: 2
           },
           {
               value: 'Watch a movie',
               isDone: true,
               id: 3
           }
        ],
        isEmptyField: false,
        filter: ''
    };

        const [items, setItems] = useState(initialState.items);
        const [filter, setFilter] = useState(initialState.filter);//sortTask
        const [isEmptyField, setEmpty] = useState(initialState.isEmptyField);
        
    const onClickDone = id => {
        const newItemList = items.map(item => {
            const newItem = {...item};
            if(item.id === id) {
                newItem.isDone = !item.isDone;
            }

            return newItem;
        })
        setItems(newItemList);
    };

    const onClickDelete = id => {
    const newItemList = items.filter(item => item.id !== id);
    setItems(newItemList);
    };
    
    const onClickAdd = value => {
        if(value !=='') {
            const newItems = [...items, 
            {
                value,
                isDone: false,
                id: maxId ++
            }
        ];
            setItems(newItems);
            setEmpty(false)
          
        } else {
            setEmpty(true)
        }
    };

    const onFilterChange = (filter) => {
        setFilter( filter);
    };
    
    let filterItems;
    switch(filter) {
        case 'all':
            filterItems = items;
            break;
        case 'active':
            filterItems = items.filter((item) => !item.isDone);
            break;
        case 'completed':
            filterItems = items.filter((item) => item.isDone);  
            break;         
        default:
            filterItems = items;
    };

        const visibleItems = filter;
        const itemsDone = items.filter((el) => el.isDone).length;
        const itemsLeft = items.length - itemsDone;
        return (
            <div className = {styles.wrap}>
            <h1 className = {styles.header}>todos</h1>
            <div className ={styles.todosWrap}>
            <InputItem  onClickAdd={onClickAdd} isEmptyField={isEmptyField} />
            <ItemList items = { visibleItems }
                      onClickDone={onClickDone}
                      onClickDelete={onClickDelete} /> 
            <Footer count = { itemsLeft }
                    filter={filterItems}
                    onFilterChange={onFilterChange} />
            </div>
        </div>);
    
};


export default Todo;