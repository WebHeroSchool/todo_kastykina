import React from 'react';
import InputItem  from '../InputItem/InputItem';
import ItemList from '../ItemList/ItemList';
import Footer from '../Footer/Footer';
import ReactLogoPng from '../../img/WHS.png';

import styles from './Todo.module.css';
  
class Todo extends React.Component {
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
        filter: 'all',
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
        this.setState(state => ({
            items: [
                ...state.items,
                {
                     value,
                    isDone: false,
                    id: this.maxId ++
                }
            ],
        }));
    }

    onFilterChange = (filter) => {
        this.setState({ filter});
    }

    filter(items, filter) {
       switch(filter) {
        case 'all':
          return items;
        case 'active':
            return items.filter((item) => !item.isDone);
        case 'completed':
            return items.filter((item) => item.isDone);           
        default:
        return items;
       }
    }

    onClearCompleted = () => {
        this.setState(state => ({ items: state.items.filter(item => !item.isDone)}));
    }
    
    render() {
        const { items, filter } = this.state;
        const visibleItems = this.filter(items, filter);
        const itemsDone = this.state.items.filter((el) => el.isDone).length;
        const itemsLeft = this.state.items.length - itemsDone;
        const allItems =  visibleItems.length;
               
        return (
            <div className = {styles.wrap}>
            <h1 className = {styles.header}>todos</h1>
            <div className ={styles.todosWrap}>
            <InputItem  onClickAdd={this.onClickAdd}
                        items={ items } 
            />
            <ItemList items = { visibleItems }
                      onClickDone={this.onClickDone}
                      onClickDelete={this.onClickDelete} /> 
            <Footer count = { itemsLeft }
                    itemsDone = { itemsDone }
                    allItems={ allItems }
                    itemsLeft = { itemsLeft  }
                    filter={filter}
                    onFilterChange={this.onFilterChange}
                    onClearCompleted={this.onClearCompleted} />
            </div>
            <div className={styles.img}>
            <img src={ReactLogoPng} alt='Разработано в WebHeroSchool' />
            </div>
        </div>);
    }
};

export default Todo;