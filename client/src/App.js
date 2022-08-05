import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';
import {Switch,Route} from "react-router-dom"
import Error from './components/Error';




function App() {
  return (
   <>
    <Navbaar />
    <Switch>
      <Route exact path="/" component={RegisterUser} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/edit/:id" component={Edit} />
      <Route exact path="/view/:id" component={Details} />
      <Route exact path="/error" component={Error} />
    </Switch>
   
   </>
  );
}

export default App;






