import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import './register.scss';
import logoEtLabel from "../../Assets/logo/logoEtLabelSm.png";
import ErrorFormLittle from "../error/ErrorFormLittle";
import ErrorForm from "../error/ErrorForm";
import {Environment} from "../../Constants/environment";
import axios from "axios";
import {userConstants} from "../../Constants/user/user.constants";
import ValidForm from "../Valid/validForm";
import {
    verifyLogin,
    verifyPassword,
    comparePassword,
    verifyFirstname,
    verifyLastname,
    verifyEmail,
    validPassword,
    validLogin,
    validEmail,
    validLastname,
    validFirstname,
    validBirthday
} from "../../Verify/verifyUser";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login:"",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "men",
            firstName: "",
            lastName: "",
            birthday: "",
            loader: false,
            activeSubmit: true,
            message: "",
            errorMsg: "",
            errorLogin: "",
            errorEmail: "",
            errorPassword: "",
            errorConfirmPassword: "",
            errorGender: "",
            errorFirstname: "",
            errorLastname: "",
            errorBirthday: "",
            redirect: false
        };
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.validateForm = this.validateForm.bind(this);
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

    handleChangeConfirmPassword(event) {
        this.setState({confirmPassword: event.target.value});
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

    validateForm() {
        let validate = {login: { success:false }, email: { success:false }, password: { success:false },
            firstName: { success:false }, lastName: { success:false }};

        this.setState({ errorMsg: "" });
        this.setState({ errorLogin: "" });
        this.setState({ errorEmail: "" });
        this.setState({ errorPassword: "" });
        this.setState({ errorConfirmPassword: "" });
        this.setState({ errorGender: "" });
        this.setState({ errorFirstname: "" });
        this.setState({ errorLastname: "" });
        this.setState({ errorBirthday: "" });

        validate.login = verifyLogin(this.state.login)
        if(!validate.login.success) this.setState({ errorLogin: validate.login.errorMsg })

        validate.email = verifyEmail(this.state.email)
        if(!validate.email.success) this.setState({ errorEmail: validate.email.errorMsg })

        validate.password = verifyPassword(this.state.password)
        if(!validate.password.success) this.setState({ errorPassword: validate.password.errorMsg })

        validate.confirmPassword = comparePassword(this.state.password, this.state.confirmPassword)
        if(!validate.confirmPassword.success) this.setState({ errorConfirmPassword: validate.confirmPassword.errorMsg })

        validate.firstName = verifyFirstname(this.state.firstName)
        if(!validate.firstName.success) this.setState({ errorFirstname: validate.firstName.errorMsg })

        validate.lastName = verifyLastname(this.state.lastName)
        if(!validate.lastName.success) this.setState({ errorLastname: validate.lastName.errorMsg })

        return !(validate.login.success === false || validate.email.success === false || validate.password.success === false ||
            validate.confirmPassword.success === false || validate.firstName.success === false || validate.lastName.success === false)
    }

    async handleSubmitRegister(event) {
        event.preventDefault();
        this.setState({loader: true});
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
                let element = document.getElementById("btn__submit");
                element.classList.add('disable');
                this.setState({ loader: false})
                this.setState({ message: userConstants.userValid.EMAIl_SEND });
                this.setState({ activeSubmit: false })
                let that = this;
                setTimeout(function() {
                   that.setState({ redirect: true });
                },6000);
            }).catch( error => {
                console.log(error.response.data)
                this.setState({ loader: false})
                if(!error.response.success ) {
                    if(typeof error.response.data.type === "string") {
                        switch (error.response.data.type) {
                            case "login":
                                validLogin(false);
                                this.setState({ errorLogin: error.response.data.error })
                                break;
                            case "email":
                                validEmail(false);
                                this.setState({ errorEmail: error.response.data.error })
                                break;
                            case "password":
                                validPassword(false);
                                this.setState({ errorPassword: error.response.data.error })
                                break;
                            case "firstName":
                                validFirstname(false);
                                this.setState({ errorFirstname: error.response.data.error })
                                break;
                            case "lastName":
                                validLastname(false);
                                this.setState({ errorLastname: error.response.data.error })
                                break;
                            case "birth":
                                validBirthday(false);
                                this.setState({ errorBirthday: error.response.data.error })
                                break;
                            default:
                                this.setState({ errorMsg: userConstants.userError.SIGNUP_ERROR })
                        }
                    } else {
                        if(typeof error.response.data.type.login === "boolean" && typeof error.response.data.type.email === "boolean") {
                            validLogin(false);
                            validEmail(false);
                            this.setState({ errorLogin: userConstants.userError.LOGIN_EXIST });
                            this.setState({ errorEmail: userConstants.userError.EMAIL_EXIST });
                        } else {
                            this.setState({ errorMsg: error.response.data.message });
                        }
                    }
                }
            })
        }
        this.setState({ loader: false})
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
                                            <input type="text" className="form-control Global_input ps-0 pe-0 " id="login_input" placeholder="login" onChange={this.handleChangeLogin}/>
                                            <label htmlFor="login_input" className="register_label ps-0 pe-0 pt-0">Login <span className={"star"}>*</span></label>
                                            {this.state.errorLogin.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorLogin}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="email" className="form-control Global_input ps-0 pe-0" id="email_input" placeholder="name@example.com" onChange={this.handleChangeEmail}/>
                                            <label htmlFor="email_input" className="register_label  ps-0 pe-0 pt-0">Adresse e-mail <span className={"star"}>*</span></label>
                                            {this.state.errorEmail && this.state.errorEmail.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorEmail}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control Global_input ps-0 pe-0 " id="password_input" placeholder="• • • • • • • • •" onChange={this.handleChangePassword}/>
                                            <label htmlFor="password_input" className="register_label ps-0 pe-0 pt-0">Mot de passe <span className={"star"}>*</span></label>
                                            {this.state.errorPassword.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorPassword}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control Global_input ps-0 pe-0 " id="Confirm_password_input" placeholder="• • • • • • • • •" onChange={this.handleChangeConfirmPassword}/>
                                            <label htmlFor="Confirm_password_input" className="register_label ps-0 pe-0 pt-0">Confirmer le mot de passe <span className={"star"}>*</span></label>
                                            {this.state.errorConfirmPassword.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorConfirmPassword}/> :null
                                            }
                                        </div>
                                    </div>
                                    <h1 className="register_label h4 text-center font_montserrat mt-4">Information personnelles</h1>
                                    <div className="col-8 pt-3 pb-3" id="Register_GenderInput--style">
                                        <label className="register_label font_montserrat mb-4">Civilité <span className={"star"}>*</span></label>
                                        <div className="form-floating row mb-4">
                                            <div className="col-4">
                                                <input type='radio' name="gender" id="men" defaultChecked value={"men"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="men" className="register_label ms-2 ">Homme</label>
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
                                            <input type="text" className="form-control Global_input ps-0 pe-0" id="firstname_input" placeholder="Prénom" onChange={this.handleChangeFirstName}/>
                                            <label htmlFor="firstname_input" className="register_label font_montserrat ps-0 pe-0 pt-0">Prénom <span className={"star"}>*</span></label>
                                            {this.state.errorFirstname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorFirstname}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="text" className="form-control Global_input ps-0 pe-0" id="lastName_input" placeholder="Nom" onChange={this.handleChangeLastName}/>
                                            <label htmlFor="lastname_input" className="register_label ps-0 pe-0 pt-0">Nom</label>
                                            {this.state.errorLastname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorLastname}/> :null
                                            }
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="date" className="form-control Global_input ps-0 pe-0 mb-3" id="birthday_input" onChange={this.handleChangeBirthday}/>
                                            <label htmlFor="birthday_input" className="register_label ps-0 pe-0 pt-0">Date de naissance</label>
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
                                    {this.state.message.length > 1 ?
                                        <div className={"success--register w-75"}>
                                        <ValidForm title={ userConstants.userValid.REGISTER_SUCCESS } message={this.state.message}/>
                                        </div>:null
                                    }
                                    <div className="row justify-content-center">
                                        <button id={"btn__submit"} className="btn col-3 fs-5 btn-submit" onClick={this.handleSubmitRegister}>Valider
                                            {this.state.loader ?
                                                <div className="spinner-border text-light ms-2" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div> :null
                                            }
                                        </button>
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
