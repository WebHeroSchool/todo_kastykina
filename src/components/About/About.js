import React from 'react';
import styles from './About.module.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import { BrowserRouter as Router} from 'react-router-dom';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import errorUserImg from '../../img/error.png';



const octokit = new Octokit();

class About extends React.Component {
    state = {
        isLoading: true,
        data: [],
        userInfo: [],
        isErrorUser: false,
        isErrorRepo: false,
        errorMessage: '',
        offset: 0,
        perPage: 5,
        currentPage: 0
    }

    receivedData() {
        octokit.repos.listForUser({
            username: 'galigalinochka'
        }).then(({data}) =>{ 
        
            
            
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
            const postData = slice.map(repo => <>
                <ol className={styles.repoLink}>
                                    <a key={repo.id} href={repo.html_url} className={styles.link} target="_blank" rel='noopener noreferrer'>
                                        {repo.name}
                                    
                                    <li className={styles.aboutRepo}>
                                        <div className={classnames({
                                            [styles.aboutRepoLanguage_html]: repo.language === 'HTML',
                                            [styles.aboutRepoLanguage_css]: repo.language === 'CSS',
                                            [styles.aboutRepoLanguage_js]: repo.language === 'JavaScript',
                                            [styles.aboutRepoLanguage_null]: repo.language === null})
                                        }>
                                            {repo.language}</div>
                                        <div className={styles.aboutRepoStar}>{repo.stargazers_count}</div>
                                        <div className={styles.aboutRepoFork}>{repo.forks_count} </div>
                                        <div className={styles.aboutRepoUpdated}> Обновлен {new Date(repo.updated_at).toLocaleDateString()} </div>
                                    </li></a> </ol>
            </>)
            
        
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                   
                postData,
                
                isLoading: false
            });
        })

        .catch(err => {
            this.setState({
                isLoading: false,
                isErrorRepo: true,
                errorMessage: err
            });
        });
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
                isErrorUser: true,
                errorMessage: err
            });
        });
    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
        this.receivedUserInfo() 
    }
    
    render() {
        const { isLoading, userInfo, isErrorUser, isErrorRepo, errorMessage } = this.state;
        const divStyle={
            color: 'red',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center'
        };
         const errMsg = 'Ошибка. Не удалось получить данные о пользователе: ' + errorMessage;
               
        return (
            
            <div className={styles.wrap}>
                { isLoading ? <LinearProgress color="secondary" /> : 
                <Router>
                    <Card>
                        {isErrorUser ?  <div style={divStyle}>{errMsg}</div>:
                            <div>
                            <div className={styles.info}>
                                
                                <img src ={userInfo.avatar_url} className={styles.avatar} alt='avatar'/>
                                
                            <div className={styles.infoBlock}>
                                <p className={styles.name}>{userInfo.name ? userInfo.name : userInfo.login}</p>
                                <p className={styles.bio}>{userInfo.bio}</p>
                                <a href="/contacts" style={{textDecoration: 'none'}}><div className={styles.contactsButton}>Посмотреть контакты</div></a>
                            </div>
                            </div>
                           
                            </div>
                        }
                    </Card>
                   <Card style={{minHeight: '100px'}}>
                    {isErrorRepo ? <div className={styles.errorBlock}>
                          <img src={errorUserImg} alt='no info' style={{marginBottom: '8px'}}/>
                            <span className={styles.errorUserText}>Что-то пошло не так...</span>
                            <p className={styles.errorUserTry}> Попробуйте&nbsp;<span onClick={() => window.location.reload()}>загрузить</span>&nbsp;ещё раз</p>

                        </div> 
                        : <>
                        {this.state.postData.length === 0 ? <div className={styles.errorBlock}>
                            <img src={errorUserImg} alt='no info' style={{marginBottom: '8px'}}/>
                            <span className={styles.errorUserText}>Репозитории отсутствуют</span>
                            <span className={styles.errorUserTry}> Добавьте как минимум один репозиторий на&nbsp;<a href="https://github.com/">github.com</a></span>

                        </div> : <>
                        <div className={styles.repozitories}>
                            <h2 className={styles.header2}>Мои репозитории:</h2>
                                {this.state.postData}
                    </div> 
                    {isErrorRepo ? '' :
                     <ReactPaginate 
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={styles.pagination}
                    subContainerClassName={styles.pagesPagination}
                    activeClassName={styles.active} /> 
                }

                    </> } </> 
                    }
                      
                   </Card>  
                  
                </Router> 
                        
                }
               
            </div>
            
        );
    }
    
}

export default About;