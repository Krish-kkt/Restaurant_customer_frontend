import classes from './CartPage.module.css';
import FloatingNav from '../Layouts/FloatingNav';
import Lottie from 'lottie-react';
import cartAnimation from '../../animations/emptyCart.json';
import { useSelector } from 'react-redux';
import { useEffect, useRef,  } from 'react';
import CartItem from '../Layouts/CartItem'


const CartPage = ()=>{

    const navOptions=[{title: 'HOME', link:'/'}, {title:'MENU', link:'/menu'}];
    const cnt= useSelector(state => state.cart.totalCnt);
    const cartItems= useSelector(state => state.cart.cartItems);
    const totalAmount= useSelector(state => state.cart.totalAmount);
    const cartAnimationRef= useRef();

    

      useEffect(()=>{
          if(cnt===0) cartAnimationRef.current.playSegments([0,80], true)
      },[])



    return (
        <div>
            <FloatingNav items={navOptions} />
            
            {cnt==0 && <div className={classes.emptyCartContainer}>
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

export default CartPage;