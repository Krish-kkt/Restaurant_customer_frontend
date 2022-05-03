import {createSlice, configureStore} from '@reduxjs/toolkit'



const initialLoginState={
    loggedIn: false,
    mailId: null,
    userType: null
}

const loginSlice=createSlice({
    name:'Login',
    initialState: initialLoginState,
    reducers:{
        login(state, action){
            state.loggedIn=true;
            state.mailId=action.payload.mailId;
            state.userType=action.payload.userType;
        },

        logout(state){
            state.loggedIn=false;
            state.mailId=null;
            state.userType=null;
        }
    }
})

const initialModalState={
    loadingSpinner: false,
    notificationSlider: false,
    notificationError: true,
    notificationMsg: null
}

const modalSlice=createSlice({
    name: 'Modal',
    initialState: initialModalState,
    reducers:{
        spinnerOn(state){
            state.loadingSpinner=true;
        },

        spinnerOff(state){
            state.loadingSpinner=false;
        },

        notificationOn(state, action){
            state.notificationError=action.payload.error;
            state.notificationMsg=action.payload.msg;
            state.notificationSlider=true;
        },

        notificationOff(state, action){
            state.notificationSlider=false;
            state.notificationMsg=null;
        }
    }
})

const initialCartState={
    cartItems:[],
    totalCnt:0,
    totalAmount:0,
};

const cartSlice= createSlice({
    name: 'Cart',
    initialState: initialCartState,
    reducers:{
        add(state, action){
            action.payload.forEach((item, index)=>{         //[_id:, cnt:, price:,  title:],[],[]
                
                let flag=true;
                let deleteElement=null;
                
                for(let i=0; i< state.cartItems.length ; i++){
                    if(item.cnt===0) break;
                    const cartItem=state.cartItems[i];
                    if(item._id===cartItem._id){
                        flag=false;
                        if((cartItem.cnt+item.cnt)<=0){
                            deleteElement=i;
                            state.totalCnt-=cartItem.cnt;
                            state.totalAmount-=(cartItem.cnt*cartItem.price);
                        }else{
                            state.cartItems[i].cnt+=item.cnt;
                            state.totalCnt+=item.cnt;
                            state.totalAmount+=(item.cnt*cartItem.price);
                        }

                        break;
                        
                    }
                }

                if(flag && item.cnt>0){
                    state.cartItems=[item,...state.cartItems];
                    state.totalCnt+=item.cnt;
                    state.totalAmount+=(item.cnt*item.price);
                }
    
                if(deleteElement!==null){
                    state.cartItems=state.cartItems.filter((cartItem, index)=> index!==deleteElement);
                }

                
            })

        }
    }
})


const store=configureStore({
    reducer: {auth:loginSlice.reducer, modal:modalSlice.reducer, cart:cartSlice.reducer}
})

export const authActions= loginSlice.actions;
export const modalActions= modalSlice.actions;
export const cartActions= cartSlice.actions;

export default store;