import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import AddFormik from "./components/views/AddFormik";
import Edit from "./components/views/Edit";
import AddFormikYup from "./components/views/AddFormikYup";
import ListFormikYup from "./components/views/ListFormikYup";
import "./App.css";



const Auth = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={Forgot} />
        {/* <Route path="/" component={Login} /> */}
        <Route path="/add" comp
        onent={AddFormik} />
        <Route path="/edit" component={Edit} />
        <Route path="/addItem" component={AddFormikYup}/>
        <Route path="/editItem/:id" component={AddFormikYup} />
        <Route path="/" component={ListFormikYup}/>
      </Switch>
    </Router>
  );
};

export default Auth;
