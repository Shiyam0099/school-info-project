import logo from "./logo.svg";
import "./App.css";
import School from "./components/School/School";
import { Route, Switch } from "react-router-dom";
import Schools from "./pages/Schools/Schools";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/AdminSchools/AdminSchools";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup/Signup";
import AdminSignup from "./pages/AdminSignup/AdminSignup";
import Signin from "./pages/Signin/Signin";
import AdminSignin from "./pages/AdminSignin/AdminSignin";
import AboutUs from "./pages/AboutUs/AboutUs";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  if (!localStorage.getItem("token")) {
    localStorage.setItem("token", "");
  }
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route strict exact path="/" component={Schools} />
          <Route strict exact path="/schools" component={Schools} />
          <Route strict exact path="/users" component={Users} />
          <Route strict exact path="/signup" component={Signup} />
          <Route strict exact path="/admin-signup" component={AdminSignup} />
          <Route strict exact path="/signin" component={Signin} />
          <Route strict exact path="/admin-signin" component={AdminSignin} />
          <Route strict exact path="/profile/:id" component={Profile} />
          <Route strict exact path="/admin-schools" component={Admin} />
          <Route strict exact path="/admin-users" component={AdminUsers} />
          <Route strict exact path="/about-us" component={AboutUs} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
