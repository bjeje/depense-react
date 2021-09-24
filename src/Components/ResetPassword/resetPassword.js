import React, {Component, Fragment} from 'react';
import logo from "../../Assets/logo/logoDepense.png"
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import loader from "../../Assets/loader/loader.gif"
import {Environment} from "../../Constants/environment";
import './resetPassword.scss';
import ErrorForm from "../error/ErrorForm";
import logoEtLabel from "../../Assets/logo/logoEtLabelSm.png";
import {userConstants} from "../../Constants/user/user.constants";
import { verifyPassword, comparePassword } from "../../Verify/verifyUser";
import ErrorFormLittle from "../error/ErrorFormLittle";
import ValidForm from "../Valid/validForm";

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            verifiedEmail: false,
            checkedLink: false,
            redirect: false,
            newPassword: "",
            confirmPassword: "",
            errorNewPass: "",
            errorConfirmPass: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
    }

    componentDidMount() {
        this.setState({error: ""});

        if(!window.location.search) {
            this.setState({ checkedLink: true })
            this.setState({ error: "Le lien n'est pas valide" })
        } else {
            let token = window.location.search;

            token = token.substr(6);
            if(token) {
                this.setState({ verifiedEmail: true })
            }
        }
    }

    handleChangePassword(e) {
        this.setState({newPassword: e.target.value})
    }

    handleChangeConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value})
    }

    validateFormReset() {
        let validate = { password: { success: false }, confirmPassword: { success: false } };
        validate.password = verifyPassword(this.state.newPassword)
        if(!validate.password.success) this.setState({errorNewPass: validate.password.errorMsg})

        validate.confirmPassword = comparePassword(this.state.newPassword, this.state.confirmPassword)
        if(!validate.confirmPassword.success) this.setState({errorConfirmPass: validate.confirmPassword.errorMsg})

        return !(validate.password.success === false || validate.confirmPassword.success === false)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({errorNewPass: "", errorConfirmPass: ""})
        let valid = this.validateFormReset();
        if(valid) {
            let token = window.location.search;

            token = token.substr(6);
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            this.setState({isLoading: true})
            axios.put(Environment.backUser + 'resetPassword', {
                newPassword: this.state.newPassword
            }, {headers: headers})
                .then(res => {
                    this.setState({ success: res.data.success, send: true, isLoading: false })
                    let that = this;
                    this.setState({ isLoading: false })
                    setTimeout(function() {
                        that.setState({redirect: true});
                    },3000)
                }).catch(error => {
                this.setState({ success: false , send: true })
                console.log(error.response)
            })
        }
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={"/login"}/>
        }
        return (
            <Fragment>
                {!this.state.verifiedEmail && !this.state.checkedLink ?
                    <div>
                        <div className={"row"}>
                            <div className={"d-flex justify-content-center mt-5 col-12"}>
                                <img className={"ml-auto mr-auto"} src={logo} alt={"logo"} height={"150px"}/>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            <h3 className={"mt-5 pt-1"}>Vérification de la demande de changement de mot de passe en cour</h3>
                            <img src={loader} alt={"loader"} className={"mt-3"}/>
                        </div>
                    </div> : null
                }

                { this.state.verifiedEmail ?

                        <div className={"forgot_page"}>
                            <div className={"container"}>
                                <div className={"col-12 col-md-10 offset-md-1 col-xl-9 offset-xl-2"}>
                                    <div className={"row"}>
                                        <div className={"col-12"}>

                                            <div className={"box__forgot row"}>
                                                <div className={"col-12 col-lg-6"}>
                                                    {/*<div className={"back__logo"}></div>*/}
                                                    <div className={"box__logo"}>
                                                        <div className={"bg__logo d-flex justify-content-center mt-lg-2"}>
                                                            <img src={logoEtLabel} alt={"logo"} className={"w-100 logo--forgot"}/>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className={"col-12 col-lg-6 box__send mt-5 mt-lg-0"}>
                                                    <div className={"row"}>
                                                        <h1 className={"fw-bold col-12 col-lg-9 offset-lg-1 col-xl-8 text-center text-lg-start"}>Changement de <br className={"br--title d-lg-block d-none"}/> mot de passe</h1>
                                                        <div className={"col-4 mt-3"}>
                                                            <Link to={"/login"}><i className="fas fa-arrow-left comeBack"/></Link>
                                                        </div>
                                                    </div>

                                                    <div className={"col-8 offset-2 col-lg-10 offset-lg-1 col-xl-8"}>
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className={"form-floating mt-3 mb-2"}>
                                                                <input type="password" id={"password_input"} className={"form-control Global_input ps-0 pe-0"}
                                                                       placeholder="passwldk" onChange={this.handleChangePassword}/>
                                                                <label htmlFor={"password_input"} className={"Register_label ps-0 pe-0 pt-0"}>Nouveau mot de passe</label>
                                                                { this.state.errorNewPass && this.state.errorNewPass.length > 0 ?
                                                                    <ErrorFormLittle error={this.state.errorNewPass}/>:null
                                                                }
                                                            </div>

                                                            <div className={"form-floating mt-3 mb-2"}>
                                                                <input type="password" id={"Confirm_password_input"} className={"form-control Global_input ps-0 pe-0"}
                                                                       placeholder="passwldk" onChange={this.handleChangeConfirmPassword}/>
                                                                <label htmlFor={"Confirm_password_input"} className={"Register_label ps-0 pe-0 pt-0"}>Confirmation du mot de passe</label>
                                                                { this.state.errorConfirmPass && this.state.errorConfirmPass.length > 0 ?
                                                                    <ErrorFormLittle error={this.state.errorConfirmPass}/>:null
                                                                }
                                                            </div>
                                                            {this.state.success && this.state.send?
                                                                <ValidForm title={"Mot de passe modifié"} message={userConstants.userValid.PASSWORD_CHANGE}/>: null
                                                            }
                                                            {!this.state.success && this.state.send?
                                                                <ErrorForm error={userConstants.userError.RESET_ERROR}/>: null
                                                            }
                                                            <div className={"d-flex justify-content-end"}>
                                                                <button className={"btn btn-submit mt-3"}>Modifier
                                                                    {this.state.isLoading ?
                                                                        <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div> :null
                                                                    }
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                    <div className={"d-flex justify-content-center mt-5"}>
                        <ErrorForm error={this.state.error}/>
                    </div>
                }
            </Fragment>
        )
    }
}

export default ResetPassword;
