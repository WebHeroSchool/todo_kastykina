import React from 'react';
import InputItem  from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';

import styles from './App.module.css';
  
class App extends React.Component {
   state = {
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
         count: 3  
    };

    onClickDone = id => {
        const newItemList = this.state.items.map(item => {
            const newItem = {...item};
            if(item.id === id) {
                newItem.isDone = !item.isDone;
                
            }

            return newItem;
        })
        this.setState({ items: newItemList});
    }
    
    onClickDelete = id => {
        const newList = this.state.items.filter(item => item.id !== id);

        this.setState({ items: newList });
    };

    render() {
        return (
            <div className = {styles.wrap}>
            <h1 className = {styles.header}>todos</h1>
            <div className ={styles.todosWrap}>
            <InputItem />
            <ItemList items = { this.state.items } onClickDone={this.onClickDone} onClickDelete={this.onClickDelete} /> 
            <Footer count = { this.state.count} />
            </div>
        </div>);
    }
};

export default App;
