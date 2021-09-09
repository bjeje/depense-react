import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import '../App.css';
import {createBrowserHistory} from "history";
import Navbar from "../Components/Navigation/Navbar/navbar";
import PrivateRouteAdmin from "../Components/PrivateRoute/PrivateRouteAdmin";
import PrivateRouteUser from "../Components/PrivateRoute/PrivateRouteUser";

//import User Page
import RegisterPage from "../Views/RegisterPage/registerPage";
import LoginPage from "../Views/LoginPage/loginPage";
import ProfilePage from "../Views/ProfilePage/profilePage";
import VerifyEmailPage from "../Views/VerifyEmailPage/verifyEmailPage";

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
                        this.state.route === "/user/verifyEmail" ? null :
                        <Navbar/>
                    }
                    <Switch>
                        {/* ROUTE UNREGISTER */}
                            <Route path="/register" component={RegisterPage}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/user/verifyEmail" component={VerifyEmailPage}/>
                        {/* ROUTES REGISTER */}
                            <PrivateRouteUser exact path={"/user/profile"} component={ProfilePage}/>
                            <PrivateRouteUser exact path={"/"} component={ProfilePage}/>
                        {/* ROUTE ADMIN */}
                        {/*    <PrivateRouteAdmin exact path={"/"} component={ManageUsersPage}/>*/}
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}
