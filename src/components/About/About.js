import React from 'react';
import styles from './About.module.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import { BrowserRouter as Router} from 'react-router-dom';
import Repositories from '../Repositories/Repositories';



const octokit = new Octokit();

class About extends React.Component {
    state = {
        isLoading: true,
        userInfo: [],
        isError: false,
        errorMessage: '',
    }
    
    receivedUserInfo() {
        octokit.users.getByUsername({
            username: 'galigalinochka'
          })
          .then(({ data }) =>{
        
            this.setState({
                userInfo: data,
                isLoading: false
            });
        })
            .catch(err => {
            this.setState({
                isLoading: false,
                isError: true,
                errorMessage: err
            });
        });
    }

    componentDidMount() {
        this.receivedUserInfo() 
    }
    
    render() {
        const { isLoading, userInfo, isError, errorMessage } = this.state;
        const divStyle={
            color: 'red',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center'
        };
         const errMsg = 'Ошибка. Не удалось получить данные о пользователе: ' + errorMessage;
              
        return (
             <div className={styles.wrap}>
                <Router>
                { isLoading ? <LinearProgress color='secondary' /> :
                    <Card>
                        {isError ?  <div style={divStyle}>{errMsg}</div> :
                             <div className={styles.info}>
                                <img src ={userInfo.avatar_url} className={styles.avatar} alt='avatar'/>
                                <div className={styles.infoBlock}>
                                    <p className={styles.name}>{userInfo.name ? userInfo.name : userInfo.login}</p>
                                    <p className={styles.bio}>{userInfo.bio ? userInfo.bio : 'Описание профиля отсутствует.' }</p>
                                    <a href='/contacts' style={{textDecoration: 'none'}}>
                                        <div className={styles.contactsButton}>Watch contacts</div>
                                    </a>
                                </div>
                            </div>
                        }
                    </Card>
                }
                <Repositories />
                </Router> 
            </div>
       );
    }
}

export default About;