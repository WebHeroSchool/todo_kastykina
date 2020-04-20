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
              isDone: false
           },
           {
               value: 'Read a book', 
               isDone: false
           },
           {
               value: 'Watch a movie',
               isDone: true
           }
        ]
           
    };

    render() {
        return (
            <div className = {styles.wrap}>
            <h1 className = {styles.header}>todos</h1>
            <div className ={styles.todosWrap}>
            <InputItem />
            <ItemList items = { this.state.items } />
            <Footer count = {3} />
            </div>
        </div>);
    }
};

export default App;