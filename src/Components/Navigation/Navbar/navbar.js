import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import './navbar.css';

const Environnement = require('../../../Constants/environment')
const Env = Environnement.environement

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.goToLogin = this.goToLogin.bind(this)
    }

    componentDidMount() {

    }

    goToLogin(event) {
        event.preventDefault();
        this.setState({goTo: "/login"})
    }

    render() {
        // changer le verif token par route Secure
        let connected = localStorage.getItem('depenseToken');

        return (

                <Fragment>
                { connected ?
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to={"#"}>logo</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <Link to={"#"}>Profil</Link>
                    </div>
                </nav> : null
                }
            </Fragment>
        )
    }
}

export default Navbar
