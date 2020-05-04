import React from 'react';
import styles from './About.module.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Octokit } from '@octokit/rest';

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
                    <div>
                        <h1 className={styles.header1}>Обо мне</h1>
                        {isError ? 'Ошибка. Невозможно отобразить. ' + errorMessage :
                            <div>
                            <div className={styles.info}>
                                <img src ={userInfo.avatar_url} className={styles.avatar} alt='avatar'/>
                            <div>
                                <p className={styles.name}>{userInfo.name ? userInfo.name : userInfo.login}</p>
                                <p className={styles.bio}>{userInfo.bio}</p>
                            </div>
                            </div>
                            <div>
                            <h2 className={styles.header2}>Мои репозитории:</h2>
                                <ol className={styles.list}>
                                    {repoList.map(repo => (<li key={repo.id}><a href={repo.html_url} className={styles.link}>
                                    {repo.name}
                                     </a>
                                </li>))}
                                </ol>
                            </div>
                            </div>
                        }
                    </div>
                
                }
            </div>
        );
    }
    
}

export default About;
