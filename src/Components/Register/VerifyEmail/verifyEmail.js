import React, {Component, Fragment} from 'react';
import logo from "../../../Assets/logo/logoDepense.png"
import axios from "axios";
import {Link} from "react-router-dom";
import loader from "../../../Assets/loader/loader.gif"
import {Environment} from "../../../Constants/environment";
import './verifyEmail.scss';
import ErrorForm from "../../error/ErrorForm";
import AuthService from "../../../Services/auth.service";

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verifiedEmail: false,
            checkedLink: false,
            error: ""
        }
    }

    componentDidMount() {
        this.setState({error: ""});

        if(!window.location.search) {
            this.setState({ checkedLink: true })
            this.setState({ error: "Le lien n'est pas valide" })
        } else {
            let token = window.location.search;

            token = token.substr(6);
            const headers = {
                'Authorization': `Bearer ${token}`
            }

            axios.put(Environment.backBase + "/user/verifyMail", {} , {headers:headers}).then(res => {
                console.log(res.data)
                this.setState({ verifiedEmail: true })
                this.setState({ checkLink: true});
            }).catch(error => {
                this.setState({ verifiedEmail: false })
                this.setState({ checkLink: true});
                this.setState({ error: "Le lien n'est pas ou plus valide"})
                console.log(error.response)
            })
        }

    }

    render() {
        return (
            <Fragment>
                <div className={"box__confirmEmail"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"d-flex justify-content-center mt-5 col-12"}>
                                <img className={"ml-auto mr-auto"} src={logo} alt={"logo"} height={"150px"}/>
                            </div>
                        </div>

                        {!this.state.verifiedEmail && !this.state.checkedLink ?
                            <div className={"d-flex justify-content-center"}>
                                <h3 className={"mt-5 pt-1"}>Confirmation en cour</h3>
                                <img src={loader} alt={"loader"} className={"mt-3"}/>
                            </div>
                            : null
                        }

                        { this.state.verifiedEmail ?
                                    <div className={"d-md-flex justify-content-center"}>
                                        <h3 className={"mt-5 pt-1"}>Félicitation, votre email à bien été vérifié</h3>
                                        <div className={"d-flex justify-content-center d-md-flex-none"}>
                                            <Link className={"mt-3 mt-md-5  ms-md-3 verify_connectBtn"} to="/login">Se connecter</Link>
                                        </div>
                                    </div>:
                                    <div className={"d-flex justify-content-center mt-5"}>
                                        <ErrorForm error={this.state.error}/>
                                    </div>
                        }

                    </div>
                </div>


            </Fragment>
        )
    }
}

export default VerifyEmail;
