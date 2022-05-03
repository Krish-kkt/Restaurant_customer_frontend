import classes from './ContactInfo.module.css';

const ContactInfo=(props)=>{
    return(
        <div className={classes.container}>
            <img src={props.icon} className={classes.icon}/>
            <div className={classes.heading}>{props.heading}</div>
            <div className={classes.description}>{props.line1}</div>
            <div className={classes.description}>{props.line2}</div>
            <div className={classes.description}>{props.line3}</div>
        </div>
    )
}

export default ContactInfo;