import classes from './Nav.module.css';
import BigNav from './BigNav';
import FloatingNav from './FloatingNav';
import { useState, Fragment, useEffect } from 'react';


const Nav=(props)=>{

    const [floatingNav, setFloatingNav]= useState(false);

    const scrollNav=()=>{
        if(window.scrollY>(window.innerHeight*.15)) setFloatingNav(true);
        if(window.scrollY<=(window.innerHeight*.15)) setFloatingNav(false);
    }

    useEffect(()=>{
        document.addEventListener('scroll',scrollNav);
        return ()=>{
            document.removeEventListener('scroll',scrollNav);
        }
    },[])

    return (
        <div>
            {floatingNav && <FloatingNav />}
            <BigNav  />
        </div>
            
        
        
            

       
    )
}

export default Nav;