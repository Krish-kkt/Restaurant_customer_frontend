import Background from "./Background";
import classes from './LogoutPopup.module.css';
import fetchRequest from "../../utility/fetchRequest";
import { modalActions, authActions, cartActions } from "../store/store";
import { useDispatch } from 'react-redux';

const LogoutPopup = (props)=>{

    const dispatch= useDispatch();

    const logoutHandler=async()=>{
        dispatch(modalActions.spinnerOn());
        const [resStatus, response]= await fetchRequest('/logout/user');
        dispatch(modalActions.spinnerOff());
        if(resStatus===200){
            dispatch(modalActions.notificationOn({error:false, msg:response.Msg}));
            dispatch(authActions.logout());
            dispatch(cartActions.reset());
            localStorage.removeItem('cart_items');
            setTimeout(()=>{
                dispatch(modalActions.notificationOff());
            },2000);
            props.disableLogout();
        }else{
            dispatch(modalActions.notificationOn({error:true, msg:response.Error}));
            setTimeout(()=>{
                dispatch(modalActions.notificationOff());
            },2000);
        }
    }

    const logoutAllHandler=async()=>{
        dispatch(modalActions.spinnerOn());
        const [resStatus, response]= await fetchRequest('/logoutall/user');
        dispatch(modalActions.spinnerOff());
        if(resStatus===200){
            dispatch(modalActions.notificationOn({error:false, msg:response.Msg}));
            dispatch(authActions.logout());
            dispatch(cartActions.reset());
            localStorage.removeItem('cart_items');

            setTimeout(()=>{
                dispatch(modalActions.notificationOff());
            },2000);
            props.disableLogout();
        }else{
            dispatch(modalActions.notificationOn({error:true, msg:response.Error}));
            setTimeout(()=>{
                dispatch(modalActions.notificationOff());
            },2000);
        }
    }

    return(
        <Background>
            <div className={classes.container}>
                <div className={classes.question}>Are you sure you want to logout?</div>
                <div className={classes.options}>
                    <button className={classes.logout} onClick={logoutHandler}>Logout</button>
                    <button className={classes.logoutall} onClick={logoutAllHandler}>Logout All</button>
                </div>
                <button className={classes.cancel} onClick={props.disableLogout}>&#x2716;</button>
            </div>
        </Background>
    )
}

export default LogoutPopup;