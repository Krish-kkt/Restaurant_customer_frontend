import classes from './Footer.module.css';
import ContactInfo from './ContactInfo';
import addressIcon from '../../img/addressIcon.png'
import mailIcon from '../../img/emailIcon.png'
import callIcon from '../../img/callIcon.png'
import clockIcon from '../../img/clockIcon.png'


const Footer=()=>{
    const date= new Date().getFullYear();

    return (
        <div className={classes.container}>
            <div className={classes.infoContainer}>
                <ContactInfo icon={addressIcon} heading={'Address'} line1={'2nd Floor, Innov8'} line2={'Kormangla, 300054'} line3={'Banglore, India'} />
                <ContactInfo icon={mailIcon} heading={'E-mail'} line1={'cafe@mydomain.com'} line2={'helpdesk@mydomain.com'} line3={''} />
                <ContactInfo icon={callIcon} heading={'Call us'} line1={'+91 1234567890'} line2={'0223 899237'} line3={''} />
                <ContactInfo icon={clockIcon} heading={'Opening hours'} line1={'Monday - Friday: 8:00 - 24:00'} line2={'Saturday: 8:00 - 23:00'} line3={''} />

            </div>
            <div className={classes.seperator}></div>
            <div className={classes.copyright}>
                © {date} by <span className={classes.highlightTextFooter}>Krishna</span> | Reference from <a href='https://themes.muffingroup.com/be/coffee2/' target="_blank" rel="noopener noreferrer" className={classes.footerLink}>BeCoffee 2 by BeTheme</a>  | Powered by React
            </div>
        </div>
    )
}

export default Footer;