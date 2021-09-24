import React, {Component, Fragment} from 'react';
import "./forgotPass.scss";
import logoEtLabel from "../../Assets/logo/logoEtLabelSm.png";
import {Link} from "react-router-dom";
import { verifyEmail } from "../../Verify/verifyUser";
import ErrorFormLittle from "../error/ErrorFormLittle";
import axios from "axios";
import {Environment} from "../../Constants/environment";
import {headers} from "../../Services/user.service";
import ValidForm from "../Valid/validForm";
import ErrorForm from "../error/ErrorForm";
import {userConstants} from "../../Constants/user/user.constants";

export class ForgotPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            errorMsg: "",
            isLoading: false,
            success: false,
            send: false,
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({error: "", errorMsg: "", isLoading: false})
        let validate = { email: {success: false}}
        validate.email = verifyEmail(this.state.email)
        if(!validate.email.success) this.setState({ error: validate.email.errorMsg })
        else {
            this.setState({isLoading: true});
            axios.post(Environment.backUser + "/forgotPassword", {
                email: this.state.email
                })
                .then(res => {
                    console.log(res.data)
                    this.setState({success: true, send: true, isLoading: false})
                }).catch(error => {
                this.setState({success: false, send: true, errorMsg: error.response.data.error, isLoading: false})
                    console.log(error.response)
                })
        }

    }

    render() {
        return (
            <Fragment>
                <div className={"forgot_page"}>
                    <div className={"container"}>
                        <div className={"col-12 col-md-10 offset-md-1 col-xl-9 offset-xl-2"}>
                            <div className={"row"}>
                                <div className={"col-12"}>

                                    <div className={"box__forgot row"}>

                                        <div className={"col-12 col-lg-6"}>
                                            {/*<div className={"back__logo"}></div>*/}
                                            <div className={"box__logo"}>
                                                <div className={"bg__logo d-flex justify-content-center"}>
                                                    <img src={logoEtLabel} alt={"logo"} className={"w-100 logo--forgot"}/>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={"col-12 col-lg-6 box__send mt-5 mt-lg-0"}>
                                            <div className={"row"}>
                                                <h1 className={"fw-bold col-12 col-lg-9 offset-lg-1 col-xl-8 text-center text-lg-start"}>Mot de passe <br className={"br--title d-lg-block d-none"}/>oublié ?</h1>
                                                <div className={"col-4 mt-3"}>
                                                    <Link to={"/login"}><i className="fas fa-arrow-left comeBack"/></Link>
                                                </div>
                                            </div>

                                            <div className={"col-8 offset-2 col-lg-10 offset-lg-1 col-xl-8"}>
                                                <p className={"mt-3 text--description ps-0"}>Entrer l'adresse email associé à votre compte</p>
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className={"form-floating mt-3 mb-2"}>
                                                        <input type="email" id={"email_input"} className={"form-control Global_input ps-0 pe-0"}
                                                               placeholder="name@example.com" onChange={this.handleChangeEmail}/>
                                                        <label htmlFor={"email_input"} className={"Register_label ps-0 pe-0 pt-0"}>Email</label>
                                                        { this.state.error.length > 0 ?
                                                            <ErrorFormLittle error={this.state.error}/>:null
                                                        }
                                                    </div>
                                                    {this.state.success && this.state.send?
                                                        <ValidForm title={"Email envoyé"} message={userConstants.userValid.EMAIL_FORGOT_SUCCESS}/>: null
                                                    }
                                                    {!this.state.success && this.state.send && this.state.errorMsg?
                                                        <ErrorForm error={this.state.errorMsg}/>: null
                                                    }
                                                    <div className={"d-flex justify-content-end"}>
                                                        <button type={"submit"} className={"btn btn-submit mt-3"}>Envoyer
                                                            {this.state.isLoading ?
                                                                <div className="spinner-border text-light ms-2" role="status">
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

            </Fragment>
        )
     }
}
