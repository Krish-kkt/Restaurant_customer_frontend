import {Fragment, useEffect, useState, } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import MenuPage from './components/Pages/MenuPage';
import CartPage from './components/Pages/CartPage';
import useInitialRequest from './hooks/initial-request';
import LoadingSpinner from './components/Modals/LoadingSpinner';
import ReactDOM from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';
import {authActions, modalActions, cartActions} from './components/store/store';
import NotificationSlider from './components/Modals/NotificationSlider';
 
function App() {

    const [menus, setMenus]=useState([]);
    const [categories, setCategories]=useState([]);
    const [flag, setFlag]= useState(true);
    const [menuScrollXcoordinate, setMenuScrollXcoordinate]=useState(0);
    const [menuScrollYcoordinate, setMenuScrollYcoordinate]=useState(0);

    const dispatch=useDispatch();

    const loadingSpinner=useSelector(state=> state.modal.loadingSpinner);
    const notificationSlider= useSelector(state=> state.modal.notificationSlider);
    const msg=useSelector(state=> state.modal.notificationMsg);
    const error=useSelector(state=> state.modal.notificationError);

    const [menuResStatus, menuResponse]= useInitialRequest('/menu');
    const [categoryResStatus, categoryResponse]= useInitialRequest('/category');
    const [liveResStatus, liveResponse] = useInitialRequest('/user'); 


    if(flag) dispatch(modalActions.spinnerOn());

    const setMenuAxis=(x,y)=>{
      setMenuScrollXcoordinate(x);
      setMenuScrollYcoordinate(y);
    }

    if(flag && menuResStatus!==null && categoryResStatus!==null && categoryResponse!==null && menuResponse!==null && liveResponse!==null && liveResStatus!==null){
      dispatch(modalActions.spinnerOff());
      if(menuResStatus===200){
        setMenus(menuResponse.reverse());
      }

      if(categoryResStatus===200){
        let categories;
        if(categoryResponse) categories=categoryResponse.reverse();
        setCategories(categories);
      }

      if(menuResStatus!==200 || categoryResStatus!==200){
        dispatch(modalActions.notificationOn({error:true, msg:'Server down! Try after some time.'}));
        setTimeout(() => {
          dispatch(modalActions.notificationOff());
        }, 2500);
      }

      if(liveResStatus===200){
        dispatch(authActions.login({mailId: liveResponse.user.mail, newUser: liveResponse.newUser}));
        dispatch(cartActions.addLogin(liveResponse.user.cart));
      }else{
        const cartItems= JSON.parse(localStorage.getItem('cart_items'));
        // console.log(cartItems);
        if(cartItems) dispatch(cartActions.add(cartItems));
      }

      setFlag(false);
    }
  

    return (
      <div>
        {loadingSpinner && ReactDOM.createPortal(<LoadingSpinner/>, document.getElementById("loader"))}
        {notificationSlider && ReactDOM.createPortal(<NotificationSlider msg={msg} error={error} />, document.getElementById("notification"))}
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/menu' exact>
            <MenuPage categories={categories} menus={menus} setMenuAxis={setMenuAxis} xCoordinate= {menuScrollXcoordinate} yCoordinate={menuScrollYcoordinate}/>
          </Route>
          <Route path='/cart' exact>
            <CartPage />
          </Route>
          <Route path='*'>
            <Redirect to='/'/>
          </Route>
        </Switch>
      </div>
    );
  }
  
  export default App;