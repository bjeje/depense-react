import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import './register.scss';
import logoEtLabel from "../../Assets/logo/logoEtLabelSm.png";
import ErrorFormLittle from "../error/ErrorFormLittle";
import ErrorForm from "../error/ErrorForm";
import {Environment} from "../../Constants/environment";
import axios from "axios";
import {userConstants} from "../../Constants/user/user.constants";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login:"",
            email: "",
            password: "",
            gender: "male",
            firstName: "",
            lastName: "",
            birthday: "",
            errorMsg: "",
            errorLogin: "",
            errorEmail: "",
            errorPassword: "",
            errorGender: "",
            errorFirstname: "",
            errorLastname: "",
            errorBirthday: "",
            redirect: false
        };
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    handleChangeLogin(event) {
        this.setState({login: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeGender(event) {
        this.setState({gender: event.target.value});
    }

    handleChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLastName(event) {
        this.setState({lastName: event.target.value});
    }

    handleChangeBirthday(event) {
        this.setState({birthday: event.target.value});
    }

    displayTrue(inputID) {
        let element = document.getElementById(inputID)
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }

    displayFalse(inputID) {
        let element = document.getElementById(inputID)
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validLogin(valid) {
        if(!valid) {
            this.displayFalse('Register_login');
        } else {
            this.displayTrue('Register_login');
        }
    }

    validEmail(valid) {
        if(!valid) {
            this.displayFalse('Register_email');
        } else {
            this.displayTrue('Register_email');
        }
    }

    validPassword(valid) {
        if(!valid) {
            this.displayFalse('Register_password')
        } else {
            this.displayTrue('Register_password');
        }
    }

    validFirstname(valid) {
        if(!valid) {
            this.displayFalse('Register_firstName');
        } else {
            this.displayTrue('Register_firstName');
        }
    }

    validLastname(valid) {
        if(!valid) {
            this.displayFalse('Register_lastName')
        } else {
            this.displayTrue('Register_lastName');
        }
    }

    validBirthday(valid) {
        if(!valid) {
            this.displayFalse('Register_birthday');
        } else {
            this.displayTrue('Register_birthday')
        }
    }

    validateForm() {
        let validate = {login: false, email: false, password: false, firstName: false, lastName: false};

        this.setState({ errorMsg: "" });
        this.setState({ errorLogin: "" });
        this.setState({ errorEmail: "" });
        this.setState({ errorPassword: "" });
        this.setState({ errorGender: "" });
        this.setState({ errorFirstname: "" });
        this.setState({ errorLastname: "" });
        this.setState({ errorBirthday: "" });

        if (this.state.login.length < 6 || this.state.login.length > 100) {
            this.validLogin(false);
            this.setState({ errorLogin: userConstants.userError.LOGIN_ERROR })
            validate.login = false;
        } else {
            this.validLogin(true);
            validate.login = true;
        }

        if (!this.validateEmail(this.state.email)) {
            this.validEmail(false);
            this.setState({ errorEmail: userConstants.userError.EMAIL_ERROR });
            validate.email = false;
        } else {
            this.validEmail(true);
            validate.email = true;
        }
        if (this.state.password.length < 2 || this.state.password.length > 100) {
            this.validPassword(false);
            this.setState({ errorPassword: userConstants.userError.PASSWORD_ERROR_LENGHT });
            validate.password = false;
        } else {
            this.validPassword(true);
            validate.password = true;
        }
        if (this.state.firstName.length < 2 || this.state.firstName.length > 100) {
            this.validFirstname(false);
            this.setState({ errorFirstname: userConstants.userError.FIRSTNAME_ERROR });
            validate.firstName = false;
        } else {
            this.validFirstname(true);
            validate.firstName = true;
        }
        if(this.state.lastName.length > 0) {
            if (this.state.lastName.length < 2 || this.state.lastName > 100) {
                this.validLastname(false);
                this.setState({ errorLastname: userConstants.userError.LASTNAME_ERROR });
                validate.lastName = false;
            } else {
                this.validLastname(true);
                validate.lastName = true;
            }
        } else {
            validate.lastName = true;
        }

        if(this.state.birthday.length > 0) {
            // if (!this.state.birth.length > 0) {
            //     birthInput.classList.add("is-invalid");
            //     birthInput.classList.remove("is-valid");
            //     this.setState({ errorBirth: userConstants.userError.BIRTHDAY_ERROR });
            //     validate.birth = false;
            // } else {
            //     birthInput.classList.remove("is-invalid");
            //     birthInput.classList.add("is-valid");
            //     validate.birth = true;
            // }
        }
        return !(validate.login === false || validate.email === false || validate.password === false || validate.firstName === false || validate.lastName === false)
    }

    async handleSubmitRegister(event) {
        event.preventDefault();
        let valid = this.validateForm();
        if (valid === true) {
            axios.post(Environment.backBase + "/user/", {
                login: this.state.login,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.gender,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: this.state.birthday
            }).then( res => {
                console.log(res)
                this.setState({ redirect: true });
            }).catch( error => {
                console.log(error.response.data)
                if( !error.response.success ) {
                    if(typeof error.response.data.type === "string") {
                        switch (error.response.data.type) {
                            case "login":
                                this.validLogin(false);
                                this.setState({ errorLogin: error.response.data.error })
                                break;
                            case "email":
                                this.validEmail(false);
                                this.setState({ errorEmail: error.response.data.error })
                                break;
                            case "password":
                                this.validPassword(false);
                                this.setState({ errorPassword: error.response.data.error })
                                break;
                            case "firstName":
                                this.validFirstname(false);
                                this.setState({ errorFirstname: error.response.data.error })
                                break;
                            case "lastName":
                                this.validLastname(false);
                                this.setState({ errorLastname: error.response.data.error })
                                break;
                            case "birth":
                                this.validBirthday(false);
                                this.setState({ errorBirthday: error.response.data.error })
                                break;
                            default:
                                this.setState({ errorMsg: userConstants.userError.SIGNUP_ERROR })
                        }
                    } else {
                        if(typeof error.response.data.type.login === "boolean" && typeof error.response.data.type.email === "boolean") {
                            this.validLogin(false);
                            this.validEmail(false);
                            this.setState({ errorLogin: userConstants.userError.LOGIN_EXIST });
                            this.setState({ errorEmail: userConstants.userError.EMAIL_EXIST });
                        } else {
                            this.setState({ errorMsg: error.response.data.message });
                        }
                    }
                }
            })
        }
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to="/login" />
        }
        return (
            <Fragment>
                <div className="Register_page d-flex row font_cabin justify-content-center m-0 pb-5">
                    <div className="col-sm-12 col-md-7 col-xl-6  text-white">
                        <div className="row justify-content-center">
                            <div className="col-8 col-md-10 col-lg-8 bg_color--veryLight Register_main mt-5 pb-5">
                                <div className="row font_montserrat text-center fs-4">
                                    <Link className="col-6 Register_connectBtn pt-2 pb-2" to="/login">Connexion</Link>
                                    <div className="col-6 register_label pt-2 pb-2">Inscription</div>
                                </div>
                                <div className="row justify-content-center  mt-4">
                                    <h1 className="h4 text-center register_label font_montserrat">Identifiants</h1>
                                    <div className="col-8 pt-3 pb-3">
                                        <div className="form-floating mb-4">
                                            <input type="login" className="form-control Register_input ps-0 pe-0 " id="Register_login" onChange={this.handleChangeLogin}/>
                                            <label htmlFor="Register_login" className="register_label ps-0 pe-0 pt-0">Login <span className={"star"}>*</span></label>
                                            {this.state.errorLogin.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorLogin}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control Register_input ps-0 pe-0" id="Register_email" placeholder="name@example.com" onChange={this.handleChangeEmail}/>
                                            <label htmlFor="Register_email" className="register_label  ps-0 pe-0 pt-0">Adresse e-mail <span className={"star"}>*</span></label>
                                            {this.state.errorEmail.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorEmail}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control Register_input ps-0 pe-0 " id="Register_password" placeholder="• • • • • • • • •" onChange={this.handleChangePassword}/>
                                            <label htmlFor="Register_password" className="register_label ps-0 pe-0 pt-0">Mot de passe <span className={"star"}>*</span></label>
                                            {this.state.errorPassword.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorPassword}/> :null
                                            }
                                        </div>
                                    </div>
                                    <h1 className="register_label h4 text-center font_montserrat mt-5">Information personnelles</h1>
                                    <div className="col-8 pt-3 pb-3" id="Register_GenderInput--style">
                                        <label className="register_label font_montserrat mb-4">Civilité <span className={"star"}>*</span></label>
                                        <div className="form-floating row mb-4">
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="male" defaultChecked value={"male"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="male" className="register_label ms-2 ">Homme</label>
                                            </div>
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="woman" value={"woman"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="woman" className="register_label ms-2">Femme</label>
                                            </div>
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="other" value={"other"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="other" className="register_label ms-2">Autres</label>
                                            </div>
                                            {this.state.errorGender.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorGender}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control Register_input ps-0 pe-0" id="Register_firstName" placeholder="Prénom" onChange={this.handleChangeFirstName}/>
                                            <label htmlFor="Register_firstName" className="register_label font_montserrat ps-0 pe-0 pt-0">Prénom <span className={"star"}>*</span></label>
                                            {this.state.errorFirstname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorFirstname}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control Register_input ps-0 pe-0" id="Register_lastName" placeholder="Nom" onChange={this.handleChangeLastName}/>
                                            <label htmlFor="Register_lastName" className="register_label ps-0 pe-0 pt-0">Nom</label>
                                            {this.state.errorLastname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorLastname}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="date" className="form-control Register_input ps-0 pe-0" id="Register_birthday" onChange={this.handleChangeBirthday}/>
                                            <label htmlFor="Register_birthday" className="register_label ps-0 pe-0 pt-0">Date de naissance</label>
                                            {this.state.errorBirthday.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorBirthday}/> :null
                                            }
                                        </div>
                                    </div>
                                    {this.state.errorMsg.length > 0 ?
                                        <div className={"w-75"}>
                                            <ErrorForm error={this.state.errorMsg}/>
                                        </div>:null
                                    }
                                    <div className="row justify-content-center mt-3">
                                        <button className="btn btn-default col-3 fs-5 btn-submit" onClick={this.handleSubmitRegister}>Valider</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-md-block col-md-4 col-xl-5 align-self-center">
                        <div className={""}>
                            <Link to="/" className="navbar-brand p-0"><img className={"img-fluid logo-disconnect"} src={process.env.PUBLIC_URL + logoEtLabel } alt="Logo de budget"/></Link>
                            <p className="sentence">Votre gestion de budget</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Register
