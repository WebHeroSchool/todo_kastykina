import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactLogoPng from '../../img/contacts.png';
import styles from './Contacts.module.css';
import contactsTelegramImg from '../../img/telegram.svg';
import contactsVkImg from '../../img/vk.svg';
import contactsGithubImg from '../../img/github.svg';
import contactsInstagramImg from '../../img/instagram.svg';
import LogoWHS from '../../img/WHS.png';


const useStyles = makeStyles({
  root: {
    fontFamily: 'Manrope',
  },
  media: {
    height: 260,
    
  },
 
});


export default function MediaCard() {
  const classes = useStyles();
  const textStyles ={
    fontWeight: 600,
    fontFamily: 'Manrope',
    color: '#a09d9d',
    fontSize: '16px',
    lineHeight: '1.7',
    cursor: 'default',
  };
  const headerStyles={
    color:'#695646',
    display: 'flex',
    justifyContent: 'space-around',
    cursor: 'default',
  };
  const footerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }
 


  return (
    <Card className={classes.root} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ ReactLogoPng }
          title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={headerStyles}>
            Galina Kastykina
            <a href="tg://resolve?domain=galinak2017" className={styles.contactsTelegram}>
                <img src={contactsTelegramImg} alt="telegram" className={styles.contactsTelegramImg}></img>
                +79214485808
            </a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={textStyles}> 
          Hello, dear guest of my first react-app! Glad to see you)
          <br/>I'm a student of front-end development school <a href="https://webheroschool.ru/" 
          alt="WHS" target="_blank"
          rel="noopener noreferrer"
          className={styles.school}
          > WebHeroSchool</a>
           . I like coding, and of course I have different hobbies, for example, i've run a marathon 42km195m.
          If you want to know more about me or to ask me a question, please, follow the links under this text)
          I hope that my "marathon of learning code" will continue with getting a cool job in frontend)
           </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={footerStyles}>
          <div className={styles.media}>
              <Button size="small" color="primary">
                <a href="https://vk.com/galigalinochka" className={styles.contactsVk} target="_blank"
                                                  rel="noopener noreferrer">
                  <img src={contactsVkImg} alt="telegram"
                                                className={styles.contactsVkImg}></img>
                </a>
              </Button>
              <Button size="small" color="primary">
                <a href="https://github.com/galigalinochka" className={styles.contactsGithub} target="_blank"
                                                  rel="noopener noreferrer">
                  <img src={contactsGithubImg} alt="github"
                                                  className={styles.contactsGithubImg}></img>
                </a>
              
                
              </Button>
              <Button size="small" color="primary">
                <a href="https://instagram.com/galigalinochka" className={styles.contactsInstagram} target="_blank"
                                                  rel="noopener noreferrer">
                  <img src={contactsInstagramImg} alt="github"
                                                  className={styles.contactsInstagramImg}></img>
                </a>
              </Button>
          </div>
          <img src={LogoWHS} alt='Разработано в WebHeroSchool' className={styles.whsLogo} />
      </CardActions>
    </Card>
  );
}