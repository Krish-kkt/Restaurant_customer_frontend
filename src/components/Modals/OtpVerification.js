import classes from './OtpVerification.module.css'
import Background from "./Background";
import cancelIcon from '../../img/cancelIcon.png'
import emailSentIcon from '../../img/emailSentIcon.png'
import { useRef, useEffect, useState, useCallback } from 'react';
import countdownConverter from '../../utility/countdownConverter';
import { useDispatch } from 'react-redux';
import { modalActions, authActions, cartActions } from '../store/store';
import fetchRequest from '../../utility/fetchRequest';
import userEvent from '@testing-library/user-event';


const OtpVerification=(props)=>{
    // console.log('loaded');

    const [timer, setTimer]= useState('02:00');
    const [flag, setFlag]= useState(true);
    const timeoutFunction = useRef(null);
    const dispatch = useDispatch();


    const num1Ref=useRef();
    const num2Ref=useRef();
    const num3Ref=useRef();
    const num4Ref=useRef();
    const resendRef=useRef();

    const otpHandlerFwd=(e,next)=>{
        const value=e.target.value;
        if(value.length){
           if(next) next.current.focus();
        }

        if(value.length>1){
            e.target.value=value[0];
        }

    }

    const otpHandlerBck=(e,prev)=>{

        if(e.key==='Backspace' && e.target.value.length===0 && prev){
            prev.current.focus();
            
        }

    }

    const resendHandler=()=>{
        setTimer('02:00');
        setFlag((prev)=>!prev);
    }

    useEffect(()=>{num1Ref.current.focus()}, [])

    useEffect(()=>{
        let remainingTime=119;
        const clock=setInterval(() => {
            resendRef.current.disabled=true;
            setTimer(countdownConverter(remainingTime));
            remainingTime--;
        }, 1000);
        
        const timeout=setTimeout(() => {
            if(clock) clearInterval(clock);
            setTimer('');
            resendRef.current.disabled=false;
        }, 119000);

        return ()=>{
            if(timeout) clearTimeout(timeout);
            if(clock) clearInterval(clock);
        }
    },[flag]);

    

    const otpSubmitHandler= async(e)=>{
        e.preventDefault();
        const value1=num1Ref.current.value;
        const value2=num2Ref.current.value;
        const value3=num3Ref.current.value;
        const value4=num4Ref.current.value;

        if(!value1 || !value2 || !value3 || !value4){

            if(timeoutFunction.current){
                clearTimeout(timeoutFunction.current);
                dispatch(modalActions.notificationOff());
            }

            setTimeout(()=>{
                dispatch(modalActions.notificationOn({error: true, msg: 'Invalid OTP!'}));
            },1)

            timeoutFunction.current= setTimeout(() => {
                dispatch(modalActions.notificationOff());
            }, 2000);
            
        }else{
            const otp= value1+value2+value3+value4;
            dispatch(modalActions.spinnerOn());
            let [resStatus, response]=await fetchRequest('/authenticate/user', 'POST', {otp});
            
            if(resStatus!==200){
                dispatch(modalActions.spinnerOff());
                dispatch(modalActions.notificationOn({error:true, msg: response.Error}));
                setTimeout(() => {
                    dispatch(modalActions.notificationOff());
                }, 2000);
            }else{
                
                dispatch(authActions.login({mailId:response.user.mail, newUser: response.newUser}));
                const cartItems= JSON.parse(localStorage.getItem('cart_items'));
                if(cartItems && cartItems.length!==0){
                    const [cartUpdateResStatus, cartUpdateResponse] = await fetchRequest('/user/cart', 'POST', {cartItems});
                    [resStatus, response]= await fetchRequest('/user');
                }
                
                // console.log(response.user);
                dispatch(cartActions.reset());
                setTimeout(() => {
                    dispatch(cartActions.addLogin(response.user.cart));
                }, 1);
                dispatch(modalActions.spinnerOff());
                props.cancelHandler();
            } 
            
        }
    }



    return(
        <Background>
            <div className={classes.container}>
                <div className={classes.iconContainer}>
                    <div className={classes.heaading}>VERIFY EMAIL</div>
                    <button onClick={props.cancelHandler} className={classes.cancelBtn} ><img src={cancelIcon} alt='cancelIcon' className={classes.cancelIcon} /></button>
                    <img src={emailSentIcon} alt='Email sent' className={classes.emailIcon} />
                </div>
                <div className={classes.msg}>
                    Enter the 4 digit code sent to your mail.
                </div>
                <form onSubmit={otpSubmitHandler}>
                    <div className={classes.otpContainer}>
                        <input ref={num1Ref} className={classes.otpInput} type='number' maxLength='1' onKeyDown={(e)=> otpHandlerBck(e)} onKeyUp={(e)=> otpHandlerFwd(e, num2Ref)}></input>
                        <input ref={num2Ref} className={classes.otpInput} type='number' maxLength='1' onKeyDown={(e)=> otpHandlerBck(e,num1Ref)} onKeyUp={(e)=> otpHandlerFwd(e, num3Ref)}></input>
                        <input ref={num3Ref} className={classes.otpInput} type='number' maxLength='1' onKeyDown={(e)=> otpHandlerBck(e,num2Ref)} onKeyUp={(e)=> otpHandlerFwd(e, num4Ref)}></input>
                        <input ref={num4Ref} className={classes.otpInput} type='number' maxLength='1' onKeyDown={(e)=> otpHandlerBck(e,num3Ref)} onKeyUp={(e)=> otpHandlerFwd(e)}></input>
                    </div>
                    <div className={classes.verifyContainer}>
                        <button type='submit' className={classes.verifyBtn}>VERIFY</button>
                    </div>
                    <div className={classes.resend}>Didn't get the code? <button ref={resendRef} type='button' className={classes.resendLink}  onClick={resendHandler}>Resend</button> <span className={classes.timer} >{timer}</span> </div>
                </form>
            </div>
        </Background>
    )

}

export default OtpVerification;