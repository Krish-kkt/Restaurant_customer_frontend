import classes from './MenuPage.module.css'
import Nav from '../Layouts/Nav';
import React, {useState, useEffect } from 'react';
import seperatorImg from '../../img/seperator.png'
import Footer from '../Layouts/Footer';
import MenuList from '../Layouts/MenuList';
import { useRef } from 'react';

const MenuPage=(props)=>{

    
    const scrollXcoordinate= useRef(0);
    const scrollYcoordinate= useRef(0);

    const categories=props.categories;

    const menus=props.menus;

    

    useEffect(()=>{
        
        
        window.scroll(props.xCoordinate, props.yCoordinate);
        window.onscroll = function() {
            scrollXcoordinate.current=window.scrollX;
            scrollYcoordinate.current=window.scrollY;
        }
        

        return ()=>{
            props.setMenuAxis(scrollXcoordinate.current,scrollYcoordinate.current);
            window.onscroll=function() {};
            
        }
            
        
        
        
    },[])



    return (
        <div>
            <div className={classes.navSection}>
                <Nav />
                <div className={classes.title}>MENU</div>
            </div>
            <img src={seperatorImg} className={classes.seperatorImg} />
            <div className={classes.heading} >Lorem ipsum dolor sit amet</div>
            <div className={classes.seperator}></div>
            <div className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris dolor, gravida a varius blandit, auctor eget purus. Phasellus scelerisque.
            </div>
            {/* <div className={classes.categorySection}>
                <div className={classes.selectCategory} >Select category :</div>
                <select className={classes.categoryInput}>
                    {categories.map((category, index) =>{
                        return (<option data-index={index} key={index} value={category.title}>{category.title}</option>)
                    })}
                </select>
            </div> */}
            <div className={classes.menuSection}>
                <MenuList categories={categories} menus={menus}/>

            </div>
            <Footer />
        </div>
    )
}

export default React.memo(MenuPage);