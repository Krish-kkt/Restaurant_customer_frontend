import classes from './BigNav.module.css';
import logoImg from '../../img/logo.png';
import NavbarContent from './NavbarContent';

const BigNav=(props)=>{
    return(
        <div className={classes.container} >
            <img className={classes.logoImg} src={logoImg} alt='Logo Img' />
            <div className={classes.navContent} >
                <NavbarContent  />
            </div>
            
        </div>
    );
}

export default BigNav; 