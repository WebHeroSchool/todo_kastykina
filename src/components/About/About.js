import React from 'react';
import styles from './About.module.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import { BrowserRouter as Router} from 'react-router-dom';


const octokit = new Octokit();

class About extends React.Component {
    state = {
        isLoading: true,
        repoList: [],
        userInfo: [],
        isError: false,
        errorMessage: ''
    }

    componentDidMount() {
        octokit.repos.listForUser({
            username: 'galigalinochka'
        }).then(({ data }) =>{ //console.log(data);
        
            this.setState({
                repoList: data,
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

        octokit.users.getByUsername({
            username: 'galigalinochka'
          })
          .then(({ data }) =>{ console.log(data);
        
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

    render() {
        const { isLoading, repoList, userInfo, isError, errorMessage } = this.state;
        return (
            
            <div className={styles.wrap}>
                { isLoading ? <LinearProgress color="secondary" /> : 
                <Router>
                    <Card>
                        <h1 className={styles.header1}>Обо мне</h1>
                        {isError ? 'Ошибка. Невозможно отобразить. ' + errorMessage :
                            <div>
                            <div className={styles.info}>
                                <div className={styles.image}>
                                <img src ={userInfo.avatar_url} className={styles.avatar} alt='avatar'/>
                                </div>
                            <div className={styles.infoBlock}>
                                <p className={styles.name}>{userInfo.name ? userInfo.name : userInfo.login}</p>
                                <p className={styles.bio}>{userInfo.bio}</p>
                                <a href="/contacts" style={{textDecoration: 'none'}}><div className={styles.contactsButton}>Посмотреть контакты</div></a>
                            </div>
                            </div>
                           
                            </div>
                        }
                    </Card>
                   <Card>
                   <div>
                     <h2 className={styles.header2}>Мои репозитории:</h2>
                         <ol className={styles.list}>
                             {repoList.map(repo => (<li key={repo.id} className={styles.links}><a href={repo.html_url} className={styles.link}>
                             {repo.name}
                              </a>
                         </li>))}
                         </ol>
                     </div>
                   </Card>   
                   </Router>         
                }
            </div>
            
        );
    }
    
}

export default About;
