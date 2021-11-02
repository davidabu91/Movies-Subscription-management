import "./App.css";
import { Provider } from "react-redux";
import { Switch,  Route } from "react-router-dom";
import { useEffect } from "react";
import {initialDataApp} from './services/start';
import store from "./store";
import Header from "./pages/Header";
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import Movies from './components/movies/Movies';
import LogOut from './components/LogOut'
import SignUp from './pages/SignUp'
import ManageUsers from './components/users/ManageUsers';
import TimeOutModal from './components/TimeOutModal'


function App() {


  useEffect(() => {
    initialDataApp()
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
      <Header />
          <TimeOutModal  />
          <Switch>
            <Route exact path='/' component={SignIn}/>
            <Route exact path='/mainpage/:name' component={MainPage}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path="/mainpage/:name/moviespage" component={Movies}/>
            <Route exact path='/mainpage/:name/logout' component={LogOut}/>
            <Route exact path='/mainpage/:name/management' component={ManageUsers}/>
          </Switch>
       
   
      </div>
    </Provider>
  );
}

export default App;
