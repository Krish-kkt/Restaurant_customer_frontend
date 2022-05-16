import classes from './CartButton.module.css'
import cartIcon from '../../img/cartIcon.png'
import { NavLink } from 'react-router-dom'


const CartButton=(props)=>{
    return (
        <NavLink to={'/cart'} activeClassName={classes.active} exact={true}>
            <button className={classes.container}>
                <img src={cartIcon} className={classes.cartIcon} />
                {props.cnt!==0 && <div className={classes.itemCnt}>{props.cnt}</div>}
            </button>
        </NavLink>
    )
}

export default CartButton;