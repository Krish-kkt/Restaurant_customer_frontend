import classes from './CartItem.module.css';
import { cartActions } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';


const CartItem =(props)=>{


    const dispatch=useDispatch();
    

    const {_id,title, price} = props;
    const increment=()=>{
        const data=[{_id, title, price, cnt:1}];
        dispatch(cartActions.add(data));

    }

    const decrement=()=>{
        const data=[{_id, title, price, cnt:-1}];
        dispatch(cartActions.add(data));

    }

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