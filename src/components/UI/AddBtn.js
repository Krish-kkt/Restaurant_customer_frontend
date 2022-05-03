import { Fragment } from 'react';
import classes from './AddBtn.module.css';

const AddBtn=(props)=>{

    
    


    return(
        <Fragment>
            {!props.item && <button className={classes.addBtn} onClick={props.increment}>
                +  Add
            </button>}

            {props.item && <div className={classes.editContainer}>
                <button className={classes.decrementBtn} onClick={props.decrement}>-</button>
                <div className={classes.cntContainer}>{props.item.cnt}</div>
                <button className={classes.incrementBtn} onClick={props.increment}>+</button>
            </div>}
        </Fragment>
            
        
    )
}

export default AddBtn