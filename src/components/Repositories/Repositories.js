import React from 'react';
import styles from './Repositories.module.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Octokit } from '@octokit/rest';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import errorUserImg from '../../img/error.png';
import LogoWHS from '../../img/WHS.png';

const octokit = new Octokit();

class Repositories extends React.Component {
    state = {
        isLoading: true,
        data: [],
        isError: false,
        offset: 0,
        perPage: 4,
        currentPage: 0
    }

    receivedData() {
        octokit.repos.listForUser({
            username: 'galigalinochka'
        })
            .then((res) =>{ 
                const data = res.data;
                               
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                           
                const postData = slice.map(repo => {
                    
                    return (<li key={repo.id} className={styles.aboutRepo}>
                        <a href={repo.html_url}
                                   className={styles.link}
                                   target='_blank'
                                   rel='noopener noreferrer'>
                                <div className={styles.repoDesc}>    
                                <span>{repo.name}</span>
                                <span className={styles.repoDescription}>{repo.description}</span></div> 
                               
                               
                                <div className={styles.aboutRepoDetails}>
                                <div className={classnames({
                                    [styles.aboutRepoLanguage_html]: repo.language === 'HTML',
                                    [styles.aboutRepoLanguage_css]: repo.language === 'CSS',
                                    [styles.aboutRepoLanguage_js]: repo.language === 'JavaScript',
                                    [styles.aboutRepoLanguage_null]: repo.language === null,
                                    
                                })}>
                                {repo.language}
                                </div>
                                <div className={styles.aboutRepoStar}>{repo.stargazers_count}</div>
                                <div className={styles.aboutRepoFork}>{repo.forks_count} </div>
                                <div className={styles.aboutRepoUpdated}> Updated {new Date(repo.updated_at).toLocaleDateString()} </div>
                                </div>  </a>
                     </li>  
                    )}
           
        )
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                postData,
                isLoading: false
            });
        })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isError: true,
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
    }

    render() {
        const { isLoading, isError, postData } = this.state;
        
        return (
            <Card style={{minHeight: '100px'}}>
                {isLoading ? <LinearProgress color='secondary' /> :
                  <>
                    {isError && 
                        <div className={styles.errorBlock}>
                            <img src={errorUserImg} alt='no info' style={{marginBottom: '8px'}}/>
                            <span className={styles.errorUserText}>Что-то пошло не так...</span>
                            <p className={styles.errorUserTry}> Попробуйте&nbsp;
                                <span  className={styles.reload}
                                       onClick={() => window.location.reload()}>
                                загрузить</span>&nbsp;ещё раз
                            </p>
                        </div>}
                        {!isError && <>
                        {postData.length === 0 ? 
                        <div className={styles.errorBlock}>
                            <img src={errorUserImg} alt='no info' style={{marginBottom: '8px'}}/>
                            <span className={styles.errorUserText}>Репозитории отсутствуют</span>
                            <span className={styles.errorUserTry}> Добавьте как минимум один репозиторий на&nbsp;
                                <a href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'>github.com</a>
                            </span>
                        </div> :
                        <div className={styles.repozitories}>
                            <h2 className={styles.header2}>My repositories:</h2>
                           
                            {postData}
                            
                            <ReactPaginate 
                                previousLabel={'<'}
                                nextLabel={'>'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={this.state.pageCount}
                                disabledClassName={styles.disabled}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={styles.pagination}
                                subContainerClassName={styles.pagesPagination}
                                activeClassName={styles.active}
                                 />
                                 <img src={LogoWHS} alt='Разработано в WebHeroSchool' className={styles.whsLogo} />    
                        </div>}
                      </>
                    }
                  </>
                }
            </Card>
        )
    }
}

export default Repositories;