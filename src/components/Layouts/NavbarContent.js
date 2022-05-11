import { Fragment, useState } from "react"
import { NavLink } from 'react-router-dom';
import classes from './NavbarContent.module.css';
import CartButton from '../UI/CartButton';
import EmailInput from "../Modals/EmailInput";
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import OtpVerification from "../Modals/OtpVerification";

const NavbarContent=(props)=>{

    const cnt= useSelector(state=> state.cart.totalCnt);
    const loggedIn= useSelector(state=> state.auth.loggedIn);

    const [emailInput, setEmailInput]=useState(false);
    const [otpInput, setOtpInput]=useState(false);

    const enableEmailInput=()=>{
        setEmailInput(true);
    }
    const disableEmailInput=()=>{
        setEmailInput(false);
    }

    const disablOtpInput=()=>{
        setOtpInput(false);
    }

    const emailSubmitHandler=(email)=>{
        setEmailInput(false);
        setOtpInput(true);
    }

    return (
        <Fragment>
            {emailInput && ReactDOM.createPortal(<EmailInput cancelHandler={disableEmailInput} emailSubmitHandler={emailSubmitHandler} />, document.getElementById("popup"))}
            {otpInput && ReactDOM.createPortal(<OtpVerification cancelHandler={disablOtpInput} />, document.getElementById("popup"))}
            {props.items.map((item)=>{
                    return(<div key={item.link} className={classes.content}><NavLink exact={true} activeClassName={classes.activeContent} to={item.link}>{item.title}</NavLink></div>)
            })}

            <div className={classes.content}><CartButton cnt={cnt} /></div>
            {!loggedIn && <button onClick={enableEmailInput} className={classes.loginBtn}>LOGIN / SIGNUP</button>}
            {loggedIn && <div className={classes.logoutContainer}>
                <button className={classes.logoutBtn}>Logout</button>
                {/* <div className={classes.mail}>{'krishnaajob@gmail.com'}</div> */}
            </div>}
        </Fragment>
    )
}

export default NavbarContent