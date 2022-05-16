import React, {Fragment, useState, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import classes from './NavbarContent.module.css';
import CartButton from '../UI/CartButton';
import EmailInput from "../Modals/EmailInput";
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import OtpVerification from "../Modals/OtpVerification";
import LogoutPopup from "../Modals/LogoutPopup";

const NavbarContent=()=>{


    const navOptions=[{title: 'HOME', link:'/'}, {title:'MENU', link:'/menu'}];
    const cnt= useSelector(state=> state.cart.totalCnt);
    const loggedIn= useSelector(state=> state.auth.loggedIn);
    // console.log('rendered');

    // const cnt=0;
    // const loggedIn=true;

    

    const [emailInput, setEmailInput]=useState(false);
    const [otpInput, setOtpInput]=useState(false);
    const [logout, setLogout]= useState(false);

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

    const enableLogout=()=>{
        setLogout(true);
    }

    const disableLogout=()=>{
        setLogout(false);
    }

    return (
        <Fragment>
            {emailInput && ReactDOM.createPortal(<EmailInput cancelHandler={disableEmailInput} emailSubmitHandler={emailSubmitHandler} />, document.getElementById("popup"))}
            {otpInput && ReactDOM.createPortal(<OtpVerification cancelHandler={disablOtpInput} />, document.getElementById("popup"))}
            {logout && ReactDOM.createPortal(<LogoutPopup disableLogout={disableLogout} />, document.getElementById('popup'))};
            {navOptions.map((item)=>{
                    return(<div key={item.link} className={classes.content}><NavLink exact={true} activeClassName={classes.activeContent} to={item.link}>{item.title}</NavLink></div>)
            })}

            <div className={classes.content}><CartButton cnt={cnt} /></div>
            {!loggedIn && <button onClick={enableEmailInput} className={classes.loginBtn}>LOGIN / SIGNUP</button>}
            {loggedIn && <div className={classes.logoutContainer}>
                <button className={classes.logoutBtn} onClick={enableLogout}>Logout</button>
                {/* <div className={classes.mail}>{'krishnaajob@gmail.com'}</div> */}
            </div>}
        </Fragment>
    )
}

export default NavbarContent;