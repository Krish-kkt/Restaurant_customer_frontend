import classes from './MenuItem.module.css';
import { Fragment, useEffect, useState } from 'react';
import AddBtn from '../UI/AddBtn';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/store';

const MenuItem=(props)=>{

    
    const presentCart= useSelector(state=>state.cart.cartItems.find(cartItem=> cartItem._id===props.menu._id));
    const dispatch= useDispatch();

    // const temp=useSelector(state=>state)
    const {_id,title, price} = props.menu;
    const increment=()=>{
        const data=[{_id, title, price, cnt:1}];
        dispatch(cartActions.add(data));

    }

    const decrement=()=>{
        const data=[{_id, title, price, cnt:-1}];
        dispatch(cartActions.add(data));

    }
    

    return (
        <Fragment>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.itemContainer}>
                        <div className={classes.title}>{props.menu.title}</div>
                        <div className={classes.description}>{props.menu.description}</div>
                    </div>
                    <div className={classes.price}>${props.menu.price}</div>
                </div>
                <div className={classes.buttons}>
                    <AddBtn item={presentCart} increment={increment} decrement={decrement} />
                </div>
            </div>
        </Fragment>
    )
}

export default MenuItem;