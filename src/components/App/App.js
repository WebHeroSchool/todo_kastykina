import React from 'react';
import InputItem  from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';

import styles from './App.module.css';
  
class App extends React.Component {
   maxId = 4;
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
        isEmptyField: false
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

    onClickDelete = id => this.setState(state => ({ items: state.items.filter(item => item.id !== id)})); 

    onClickAdd = value => {
        if(value !=='') {
            this.setState(state => ({
                items: [
                    ...state.items,
                    {
                        value,
                        isDone: false,
                        id: this.maxId ++
                    }
                ],
                isEmptyField: false 
            }));
        } else {
            this.setState(state => ({
                isEmptyField: true}))
        }
    }
   
    render() {
        const itemsDone = this.state.items.filter((el) => el.isDone).length;
        const itemsLeft = this.state.items.length - itemsDone;
        return (
            <div className = {styles.wrap}>
            <h1 className = {styles.header}>todos</h1>
            <div className ={styles.todosWrap}>
            <InputItem  onClickAdd={this.onClickAdd} isEmptyField={this.state.isEmptyField} />
            <ItemList items = { this.state.items } onClickDone={this.onClickDone} onClickDelete={this.onClickDelete} /> 
            <Footer count = { itemsLeft } />
            </div>
        </div>);
    }
};

export default App;
