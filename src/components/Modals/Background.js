import classes from './Background.module.css'
import { useEffect } from 'react';

const Background=(props)=>{

    useEffect(() => {
        const topScroll = window.pageYOffset || document.documentElement.scrollTop;
        const leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

        // if scroll happens, set it to the previous value
        window.onscroll = function() {
            window.scrollTo(leftScroll, topScroll);
        }

        return ()=>{
            window.onscroll= function() {};
        }

          
      },[])

    return(
        <div className={classes.overlay} style={{zIndex: props.zIndex}} >
            {props.children}
        </div>
    )
}

export default Background;