import classes from './MenuList.module.css';
import { Fragment } from 'react';
import MenuItem from './MenuItem';

const MenuList=(props)=>{
    return (
        <Fragment>
            {props.categories.map((category, index)=>{
                if(props.categories.length!==props.menus.length) return;
                return (props.menus[index].length!==0 && (
                    <div key={index} className={classes.container} >
                        <div className={classes.categoryName}>{category.title}</div>
                        <div className={classes.underline}></div>
                        <div className={classes.itemContainer}>
                            {props.menus[index].map((item)=> {
                                return (<MenuItem key={item._id} menu={item} menus={props.menus[index]} index={index}/>)
                            })}
                        </div>
                    </div>
                ))
            })}
        </Fragment>
    )
}

export default MenuList;