import Background from "./Background";
import classes from './EmailInput.module.css'
import userIcon from '../../img/userIcon.png'
import cancelIcon from '../../img/cancelIcon.png'
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/store";
import fetchRequest from "../../utility/fetchRequest";

const EmailInput=(props)=>{

    const dispatch=useDispatch();

    const emailRef=useRef();
    const submitBtnRef=useRef();

    const submitHandler= async(e)=>{
        e.preventDefault();
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailRef.current.value.match(validRegex)){
            emailRef.current.focus();
            dispatch(modalActions.notificationOn({error:true, msg:'Invalid mail id!'}));
            submitBtnRef.current.disabled=true;
            setTimeout(()=>{
                dispatch(modalActions.notificationOff());
                submitBtnRef.current.disabled=false;
            }, 2500);
            
        }else{

            const data={mail:emailRef.current.value};
            dispatch(modalActions.spinnerOn());
            const [resStatus, response]= await fetchRequest('/login/user', 'POST', data);
            dispatch(modalActions.spinnerOff());
            if(resStatus!==200){
                dispatch(modalActions.notificationOn({error:true, msg:response.Error}));
                setTimeout(()=>{
                    dispatch(modalActions.notificationOff());
                    // submitBtnRef.current.disabled=false;
                }, 2500);
            }else{
                props.emailSubmitHandler(emailRef.current.value);
            }

            
        }
    }

    return (
        <Background>
            <form onSubmit={submitHandler}> 
                <div className={classes.container}>
                    <div className={classes.iconContainer}>
                        <img src={userIcon} alt='userIcon' className={classes.userIcon} />
                        <button type="button" onClick={props.cancelHandler} className={classes.cancelBtn} ><img src={cancelIcon} alt='cancelIcon' className={classes.cancelIcon} /></button>
                    </div>
                    <div className={classes.emailContainer}>
                        <div className={classes.emailText}>EMAIL</div>
                        <input ref={emailRef} className={classes.emailInput} placeholder="Your Email" />
                    </div>
                    <button type="submit" ref={submitBtnRef} className={classes.getOtpBtn}>NEXT</button>
                </div>
            </form>
        </Background>
    )
}

export default EmailInput;