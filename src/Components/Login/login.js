import React, {Component, Fragment} from 'react';
import './login.scss';
import {Link} from "react-router-dom";

import logoEtLabel from "../../Assets/logo/logoEtLabelSm.png";
import ErrorForm from "../error/ErrorForm";
import {Environment} from "../../Constants/environment";
import axios from "axios";
import { userConstants } from "../../Constants/user/user.constants";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
            redirect: false,
            errorMsg: ""
        }
        this.validateForm = this.validateForm.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleChangeLogin(event){
        this.setState({login: event.target.value});
    }

    handleChangePassword(event){
        this.setState({password: event.target.value});
    }

    validateForm() {
        this.setState({errorMsg: ""});
        let validate = { login: false, password: false };

        if(this.state.login.length === 0  || this.state.password.length === 0) {
            return { success: false, type: "empty"}
        }

        if (this.state.login.length < 6 || this.state.login.length > 100) {
            validate.login = false;
        } else {
            validate.login = true;
        }

        if (this.state.password.length < 2 || this.state.password.length > 100) {
            validate.password = false;
        } else {
            validate.password = true;
        }

        return { success: !(validate.login === false || validate.password === false), type: "full"};
    }

    handleSubmitLogin(event){
        event.preventDefault();
        let validForm = this.validateForm();
        if(validForm.success) {
            axios.post(Environment.backBase + "/user/login", {
                login: this.state.login,
                password: this.state.password,
            }).then( res => {
                localStorage.setItem("depenseToken", res.data.token)

                this.setState({ redirect: res.data.success });

            }).catch( error => {
                console.log(error.response)
                if(!error.response.success) {
                    this.setState({ errorMsg: error.response.data.error });
                }
            })
        } else if (!validForm.success && validForm.type === "full") {
            this.setState({ errorMsg: userConstants.userError.SIGNIN_ERROR });
        } else {
            this.setState({ errorMsg: userConstants.userError.SIGNIN_EMPTY });
        }
    }

    render() {
        if(this.state.redirect === true){
            window.location.href = "/";
        }
        return (
            <Fragment>
                <div className="Login_page d-flex row font_cabin justify-content-center m-0">
                    <div className="col-sm-12 col-md-7 col-xl-6">
                        <div className="row justify-content-center vh-100">
                            <div className="col-8 mt-3 mb-3 Login_main pb-4 align-self-center">
                                <div className="row font_montserrat text-center fs-4">
                                    <div className="col-6 pt-2 pb-2" >Connexion</div>
                                    <Link className="col-6 Login_registerBtn  pt-2 pb-2" to="/register">Inscription</Link>
                                </div>
                                <div className="row justify-content-center mt-4">
                                    <div className="col-8 pt-3 pb-3">
                                        <div className="form-floating mb-4">
                                            <input type="login" className="form-control Login_input ps-0 pe-0" id="Login" placeholder="login185" onChange={this.handleChangeLogin}/>
                                            <label htmlFor="Login" className="ps-0 pe-0 pt-0">Login</label>
                                        </div>
                                        <div className="form-floating mb-2">
                                            <input type="password" className="form-control Login_input ps-0 pe-0" id="password" placeholder="• • • • • • • • •" onChange={this.handleChangePassword}/>
                                            <label htmlFor="password" className="ps-0 pe-0 pt-0">Mot de passe</label>
                                            <div className={"text-end mt-3"}>
                                                <Link to={"/forgottenPassword"} className={"forgotten__password"}>Mot de passe oublié ?</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.errorMsg.length > 0 ?
                                        <div className={"w-75"}>
                                            <ErrorForm error={this.state.errorMsg}/>
                                        </div>:null
                                    }
                                    <div className="row justify-content-center mt-3 mb-3">
                                        <button className="btn col-4 fs-5 btn-submit" onClick={this.handleSubmitLogin}>Se connecter</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-md-block col-md-4 col-xl-5 align-self-center text-center">
                        <Link to="/" className="navbar-brand p-0"><img className={"img-fluid logo-disconnect"} src={process.env.PUBLIC_URL + logoEtLabel } alt="Logo de budget"/></Link>
                        <p className="sentence">Votre gestion de budget</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;
