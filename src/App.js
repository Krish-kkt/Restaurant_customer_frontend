import {Fragment, useEffect, useState, } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import MenuPage from './components/Pages/MenuPage';
// import CartPage from './components/Pages/CartPage';
import useInitialRequest from './hooks/initial-request';
import LoadingSpinner from './components/Modals/LoadingSpinner';
import ReactDOM from 'react-dom';
import {useSelector, useDispatch} from 'react-redux';
import {authActions, modalActions} from './components/store/store';
import NotificationSlider from './components/Modals/NotificationSlider';
 
function App() {

    const [menus, setMenus]=useState([]);
    const [categories, setCategories]=useState([]);
    const [flag, setFlag]= useState(true);

    const dispatch=useDispatch();

    const loadingSpinner=useSelector(state=> state.modal.loadingSpinner);
    const notificationSlider= useSelector(state=> state.modal.notificationSlider);
    const msg=useSelector(state=> state.modal.notificationMsg);
    const error=useSelector(state=> state.modal.notificationError);

    const [menuResStatus, menuResponse]= useInitialRequest('/menu');
    const [categoryResStatus, categoryResponse]= useInitialRequest('/category');


    if(flag) dispatch(modalActions.spinnerOn());

    if(flag && menuResStatus && categoryResStatus && categoryResponse && menuResponse){
      dispatch(modalActions.spinnerOff());
      if(menuResStatus===200){
        setMenus(menuResponse);
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
            <MenuPage categories={categories} menus={menus} />
          </Route>
          {/* <Route path='/cart' exact>
            <CartPage />
          </Route> */}
          <Route path='*'>
            <Redirect to='/'/>
          </Route>
        </Switch>
      </div>
    );
  }
  
  export default App;