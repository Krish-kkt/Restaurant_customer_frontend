import { response } from 'express';
import classes from './CartItem.module.css';


const CartItem =(props)=>{

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
                <button className={classes.decreaseBtn}>-</button>
                <button className={classes.increaseBtn}>+</button>
            </div>

        </div>

    )
}

export default CartItem;