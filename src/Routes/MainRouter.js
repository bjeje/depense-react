import React, {Component, Fragment} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import '../App.css';
import {createBrowserHistory} from "history";
import Navbar from "../Components/Navigation/Navbar/navbar";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";

//import Page
import RegisterPage from "../Views/RegisterPage/registerPage";

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
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}
