import classes from './CartPage.module.css';
import FloatingNav from '../Layouts/FloatingNav';
import Lottie from 'lottie-react';
import cartAnimation from '../../animations/emptyCart.json';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef,  } from 'react';
import CartItem from '../Layouts/CartItem'


const CartPage = ()=>{

    
    const cnt= useSelector(state => state.cart.totalCnt);
    const cartItems= useSelector(state => state.cart.cartItems);
    const totalAmount= useSelector(state => state.cart.totalAmount);
    const cartAnimationRef= useRef();

    window.onscroll=function() {};

    useEffect(()=>{
          if(cnt===0) cartAnimationRef.current.playSegments([0,80], true)
    },[])



    return (
        <div>
            <FloatingNav  />
            
            {cnt===0 && <div className={classes.emptyCartContainer}>
                <Lottie lottieRef={cartAnimationRef} animationData={cartAnimation} loop={false} style={{height: '40vh'}}  />
            </div>}

            {cnt!==0 && <div className={classes.cartContainer}>
                <div className={classes.cartList}>
                    {cartItems.map((item)=>{
                        return (<CartItem title={item.title} key={item._id} _id={item._id} price={item.price} cnt={item.cnt} />);
                        
                    })}
                    <div className={classes.totalAmount}>
                        <div>Total Amount</div>
                        <div>${totalAmount}</div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default React.memo(CartPage);