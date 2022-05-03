import classes from './MenuPage.module.css'
import Nav from '../Layouts/Nav';
import { useState, useEffect } from 'react';
import seperatorImg from '../../img/seperator.png'
import Footer from '../Layouts/Footer';
import MenuList from '../Layouts/MenuList';

const MenuPage=(props)=>{

    const navOptions=[{title: 'HOME', link:'/'}, {title:'MENU', link:'/menu'}];
    const categories=props.categories;

    const menus=props.menus;

    useEffect(()=>{
        if (window.scrollY) {
            window.scroll(0, 0); 
          }
    },[])

    return (
        <div>
            <div className={classes.navSection}>
                <Nav navOptions={navOptions} />
                <div className={classes.title}>MENU</div>
            </div>
            <img src={seperatorImg} className={classes.seperatorImg} />
            <div className={classes.heading} >Lorem ipsum dolor sit amet</div>
            <div className={classes.seperator}></div>
            <div className={classes.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mauris dolor, gravida a varius blandit, auctor eget purus. Phasellus scelerisque.
            </div>
            <div className={classes.categorySection}>
                <div className={classes.selectCategory} >Select category :</div>
                <select className={classes.categoryInput}>
                    {categories.map((category, index) =>{
                        return (<option data-index={index} key={index} value={category.title}>{category.title}</option>)
                    })}
                </select>
            </div>
            <div className={classes.menuSection}>
                <MenuList categories={categories} menus={menus}/>

            </div>
            <Footer />
        </div>
    )
}

export default MenuPage;