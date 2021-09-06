import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import '../App.css';
import {createBrowserHistory} from "history";
import Navbar from "../Components/Navigation/Navbar/navbar";
import PrivateRouteAdmin from "../Components/PrivateRoute/PrivateRouteAdmin";
import PrivateRouteUser from "../Components/PrivateRoute/PrivateRouteUser";

//import Page
import RegisterPage from "../Views/RegisterPage/registerPage";
import LoginPage from "../Views/LoginPage/loginPage";
import ProfilePage from "../Views/ProfilePage/profilePage";

export default class MainRouter extends Component {

    constructor(props) {
        super(props);
        const history = createBrowserHistory()
        this.state = {
            route: history.location.pathname,
            redirection: false,
            research: "",
        }
    }

    render() {
        const {redirection} = this.state;
        if (redirection) {
            this.setState({redirection: false})
            return <Redirect to={{
                pathname: this.state.research,
            }}/>
        }
        return (
            <Fragment>
                <Router>
                    {this.state.route === "/login" ? null : this.state.route === "/register" ? null :
                        <Navbar/>
                    }
                    <Switch>
                        <Route path="/register" component={RegisterPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <PrivateRouteUser exact path={"/profile"} component={ProfilePage}/>
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}
