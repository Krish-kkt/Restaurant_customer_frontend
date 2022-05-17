import classes from './CartItem.module.css';
import { cartActions, sendAddRequest } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


const CartItem =(props)=>{


    const dispatch=useDispatch();
    const loggedIn=useSelector(state=>state.auth.loggedIn);

    const {_id,title, price} = props;
    const increment=()=>{
        const data=[{_id, title, price, cnt:1}];
        if(!loggedIn) dispatch(cartActions.add(data));
        if(loggedIn) dispatch(sendAddRequest(data));
    }

    const decrement=()=>{
        const data=[{_id, title, price, cnt:-1}];
        if(!loggedIn) dispatch(cartActions.add(data));
        if(loggedIn) dispatch(sendAddRequest(data));
    }

    // useEffect(()=>{
    //     if(flag){
    //         localStorage.setItem("cart_items", JSON.stringify(cartItems));
    //         console.log('local');
    //     } 
    //     setFlag(true);
    // },[cartItems]);

    return (
        <div className={classes.container}>
            <div className={classes.leftSection}>
                <div className={classes.title}>{props.title}</div>
                <div className={classes.lowerSection}>
                    <div className={classes.price}>${props.price}</div>
                    <div className={classes.cnt}>&#10006; {props.cnt}</div>
                </div>
            </div>
            <div className={classes.rightSection}>
                <button onClick={decrement} className={classes.decreaseBtn}>-</button>
                <button onClick={increment} className={classes.increaseBtn}>+</button>
            </div>

        </div>

    )
}

export default CartItem;