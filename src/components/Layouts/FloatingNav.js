import React from "react"

import classes from './FloatingNav.module.css';
import { Fragment, useState} from 'react';
import logoImg from '../../img/logo.png';
import NavbarContent from './NavbarContent';



const FloatingNav = (props)=>{

    return (
            <div className={classes.main}>
                <img className={classes['img-logo']} src={logoImg} alt='Logo Img' /> 
                <div className={classes.navbarContent}>
                    <NavbarContent items={props.items}  />
                    
                </div>
                
                    
                
            </div>
    )
}

export default FloatingNav;