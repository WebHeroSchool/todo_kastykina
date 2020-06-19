import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import MenuList from '@material-ui/core/MenuList';
import Todo  from '../Todo/Todo';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import styles from './App.module.css';

const App = () =>
 (<Router basename={process.env.PUBLIC_URL}>
    <div className={styles.wrap}>
      <Card className={styles.sidebar}>
        <MenuList className = {styles.menu}>
            <NavLink exact to={process.env.PUBLIC_URL + '/'} className={styles.link} activeClassName={styles.active} >
              About me
            </NavLink>
            <NavLink to={process.env.PUBLIC_URL + '/todo'} className={styles.link} activeClassName={styles.active}>
              Todo
            </NavLink>
            <NavLink to={process.env.PUBLIC_URL + '/contacts'} className={styles.link} activeClassName={styles.active}>
              Contacts
            </NavLink>
        </MenuList>
      </Card>
      
      <Card className={styles.content}>
          <Route path={process.env.PUBLIC_URL + '/'} exact component={About} />
          <Route path={process.env.PUBLIC_URL + '/todo'} component={Todo} />
          <Route path={process.env.PUBLIC_URL + '/contacts'} component={Contacts} />
      </Card>
    </div>
 </Router> 
);

export default App;