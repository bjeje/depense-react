import React, {Component, Fragment} from "react";
import "./editProfile.scss"
import dayjs from "dayjs";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../Redux/Actions/user.actions";
import men from "../../../Assets/profil/men.jpg";
import woman from "../../../Assets/profil/woman.jpg";
import undefinedUser from "../../../Assets/profil/undefined-user.png";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import { ModalEditLogin } from "../modal/modalEditLogin";
import { ModalEditEmail } from "../modal/modalEditEmail";
import {ModalEditPassword} from "../modal/modalEditPassword";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: this.props.user.login,
            email: this.props.user.email,
            password: "",
            gender: this.props.user.gender,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            birthday: dayjs(this.props.user.birthday).format('YYYY-MM-DD'),
        }
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this)
        this.handleSubmitPersonnal= this.handleSubmitPersonnal.bind(this)
        this.handleSubmitSecurity = this.handleSubmitSecurity.bind(this)
        this.showEditLogin = this.showEditLogin.bind(this)
        this.hideEditLogin = this.hideEditLogin.bind(this)
        this.showEditEmail = this.showEditEmail.bind(this)
        this.hideEditEmail = this.hideEditEmail.bind(this)
        this.showEditPassword = this.showEditPassword.bind(this)
        this.hideEditPassword = this.hideEditPassword.bind(this)
    }

    componentDidMount() {
        this.props.getUser();
    }

    showEditLogin = (event) => {
        this.setState({ showEditLogin: true });
    };

    hideEditLogin = () => {
        this.setState({ showEditLogin: false });
    };

    showEditEmail = (event) => {
        this.setState({ showEditEmail: true });
    };

    hideEditEmail = () => {
        this.setState({ showEditEmail: false });
    };

    showEditPassword = (event) => {
        this.setState({ showEditPassword: true });
    };

    hideEditPassword = () => {
        this.setState({ showEditPassword: false });
    };


    handleChangeLogin() {

    }

    handleChangeEmail() {

    }

    handleChangePassword() {

    }

    handleChangeGender() {

    }

    handleChangeFirstname() {

    }

    handleChangeLastname() {

    }

    handleChangeBirthday(e) {
        e.preventDefault();
        this.setState({birthday: e.target.value})
    }

    handleSubmitPersonnal() {

    }

    handleSubmitSecurity() {

    }

    render() {
        return (
            <Fragment>
                <div className={"col-10 offset-1 mt-4"}>
                    <div className={"row"}>
                        {/*<div className={"col-8 col-md-6 offset-md-2 col-lg-6"}>*/}
                        <div className={"col-12"}>
                            <div className={"d-flex justify-content-center mt-4"}>
                                { this.props.user.gender === "male" ?
                                    <img src={men} alt={"Profile"} className={"imgProfileTabs"}/>
                                    :null
                                }
                                { this.props.user.gender === "woman" ?
                                    <img src={woman} alt={"Profile"} className={"imgProfileTabs"}/>:null
                                }
                                { this.props.user.gender === "other" ?
                                    <img src={undefinedUser} alt={"Profile"} className={"imgProfileTabs"}/>:null
                                }
                            </div>
                            <h1 className={"text-center"}>Identifiants</h1>
                            <div className={"row mt-3 box__security"}>
                                <div className={'col-8 col-md-6 offset-md-2 col-lg-6'}>
                                    <p className={"fw-bold"}>Login</p>
                                    <p className={'stripped--dark'}>{this.props.user.login}</p>
                                </div>
                                <div className={"col-4 col-md-3"}>
                                    <button className={"btn--edit btn--login"} onClick={this.showEditLogin}>
                                        Modifier
                                    </button>
                                </div>
                                <ModalEditLogin show={this.state.showEditLogin}
                                                handleCloseLogin={this.hideEditLogin}
                                                userLogin={this.props.user.login}/>
                                <div className={"col-8 col-md-6 offset-md-2 col-lg-6"}>
                                    <p className={"fw-bold"}>Email</p>
                                    <p className={'stripped--dark'}>{this.props.user.email}</p>
                                </div>
                                <div className={"col-4 col-md-3"}>
                                    <button className={"btn--edit btn--email"} onClick={this.showEditEmail}>
                                        Modifier
                                    </button>
                                </div>
                                <ModalEditEmail show={this.state.showEditEmail}
                                                handleCloseEmail={this.hideEditEmail}
                                                emailUser={this.props.user.email}/>
                            </div>
                            <div className={"row justify-content-center  mt-4"}>
                                <p className={"text-center edit--label fw-bold mt-3"}><i
                                    className="fas fa-key text-danger"/> Mot de passe</p>
                                <button className={"btn--password mb-3"} onClick={this.showEditPassword}>Changer le mot de passe</button>
                            </div>
                            <ModalEditPassword show={this.state.showEditPassword}
                                            handleClosePassword={this.hideEditPassword}/>
                        </div>

                        {/*</div>*/}
                        <div className={"col-12"}>
                                <h1 className={"text-center mt-4"}>Information personnelles</h1>
                                <div className={"row justify-content-center box__personnal mt-3 mb-4"}>
                                    <div className={"col-10 offset-1"}>
                                        <form onSubmit={this.handleSubmitPersonnal}>
                                            <label className="register_label font_montserrat mb-4">Civilité <span className={"star"}>*</span></label>
                                            <div className="form-floating row mb-4">

                                                    <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                        <input type='radio' name="gender" id="men" defaultChecked value={"male"} onChange={this.handleChangeGender}/>
                                                        <label htmlFor="men" className="register_label ms-2 ">Homme</label>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                        <input type='radio' name="gender" id="woman" value={"woman"} onChange={this.handleChangeGender}/>
                                                        <label htmlFor="woman" className="register_label ms-2">Femme</label>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                        <input type='radio' name="gender" id="other" value={"other"} onChange={this.handleChangeGender}/>
                                                        <label htmlFor="other" className="register_label ms-2">Autres</label>
                                                    </div>


                                                {/*{this.state.errorGender.length > 0 ?*/}
                                                {/*    <ErrorFormLittle error={this.state.errorGender}/> :null*/}
                                                {/*}*/}
                                            </div>
                                            <div className={"form-group mb-4"}>
                                                <label htmlFor={"firstname"} className={"Edit_label ps-0 pe-0"}>Prénom <span className={"star"}>*</span></label>
                                                <input type={"text"} id={"firstname"} className={"form-control Edit_input mt-1 ps-0 pe-0"} placeholder={"prénom"} value={this.props.user.firstName} onChange={this.handleChangeFirstname}/>
                                            </div>

                                            <div className={"form-group mb-4"}>
                                                <label htmlFor={"lastname"}>Nom </label>
                                                <input type={"text"} id={"lastname"} className={"form-control Edit_input mt-1 ps-0 pe-0"} value={this.props.user.lastName} onChange={this.handleChangeLastname}/>
                                            </div>

                                            <div className={"form-group mb-4"}>
                                                <label htmlFor={"birthday"}>Date de naissance</label>
                                                <input type={"date"} id={"birthday"} className={"form-control Edit_input mt-1 ps-0 pe-0"} value={this.state.birthday} onChange={this.handleChangeBirthday}/>
                                            </div>
                                            <div className={"row justify-content-center"}>
                                                <input type="submit" value="Envoyer" className={"col-3 fs-5 btn--edit btn--personnal"}/>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>



                            {/*<form onSubmit={this.handleSubmitSecurity}>*/}
                            {/*    <div className={"form-group mb-4"}>*/}
                            {/*        <label htmlFor={"login"} className={"Edit_label ps-0 pe-0"}>Login</label>*/}
                            {/*        <input type={"text"} id={"login"} className={"form-control Edit_input mt-1 ps-0 pe-0"} placeholder={"login"} value={this.props.user.login} onChange={this.handleChangeLogin}/>*/}
                            {/*    </div>*/}

                            {/*    <div className={"form-group mb-4"}>*/}
                            {/*        <label htmlFor={"email"}>Email</label>*/}
                            {/*        <input type={"text"} id={"email"} className={"form-control Edit_input mt-1 ps-0 pe-0"} value={this.props.user.email} onChange={this.handleChangeEmail}/>*/}
                            {/*    </div>*/}

                            {/*    <div className={"form-group mb-4"}>*/}
                            {/*        <label htmlFor={"password"}>mot de passe</label>*/}
                            {/*        <input type={"text"} id={"password"} className={"form-control Edit_input mt-1 ps-0 pe-0"} onChange={this.handleChangePassword}/>*/}
                            {/*    </div>*/}

                            {/*    <input type="submit" value="Envoyer" className={"btn btn-default col-3 fs-5 btn-submit"}/>*/}
                            {/*</form>*/}

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        isLoading: state.userReducer.isLoading,
        error: state.userReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUser: getUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
