import React, {Component, Fragment} from "react";
import "./editProfile.scss"
import dayjs from "dayjs";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser, editPersonnalInfo} from "../../../Redux/Actions/user.actions";
import menPicture from "../../../Assets/profil/men.jpg";
import womanPicture from "../../../Assets/profil/woman.jpg";
import undefinedUser from "../../../Assets/profil/undefined-user.png";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import { ModalEditLogin } from "../modal/modalEditLogin";
import { ModalEditEmail } from "../modal/modalEditEmail";
import {ModalEditPassword} from "../modal/modalEditPassword";
import {userConstants} from "../../../Constants/user/user.constants";
import ErrorForm from "../../error/ErrorForm";

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
            errorFirstname: '',
            errorLastname: '',
            errorBirthday: '',
        }
        this.handleChangeGender = this.handleChangeGender.bind(this)
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
        this.handleChangeLastname = this.handleChangeLastname.bind(this);
        this.handleChangeBirthday = this.handleChangeBirthday.bind(this)
        this.handleSubmitPersonnal= this.handleSubmitPersonnal.bind(this)
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

    validFirstname(valid) {
        if(!valid) {
            this.displayFalse('firstname');
        } else {
            this.displayTrue('firstname');
        }
    }

    validLastname(valid) {
        if(!valid) {
            this.displayFalse('lastname')
        } else {
            this.displayTrue('lastname');
        }
    }

    validBirthday(valid) {
        if(!valid) {
            this.displayFalse('birthday');
        } else {
            this.displayTrue('birthday')
        }
    }

    isDate(date) {
        if(!(new Date(date) !== "Invalid Date") && !isNaN(new Date(date))) {
            return { success: false }
        } else {
            return { success: true }
        }
    }

    showEditLogin = () => {
        this.setState({ showEditLogin: true });
    };

    hideEditLogin = () => {
        this.setState({ showEditLogin: false });
    };

    showEditEmail = () => {
        this.setState({ showEditEmail: true });
    };

    hideEditEmail = () => {
        this.setState({ showEditEmail: false });
    };

    showEditPassword = () => {
        this.setState({ showEditPassword: true });
    };

    hideEditPassword = () => {
        this.setState({ showEditPassword: false });
    };

    handleChangeGender(e) {
        this.setState({gender: e.target.value})
    }

    handleChangeFirstname(e) {
        e.preventDefault();
        this.setState({firstName: e.target.value})
    }

    handleChangeLastname(e) {
        e.preventDefault();
        this.setState({lastName: e.target.value})
    }

    handleChangeBirthday(e) {
        e.preventDefault();
        this.setState({birthday: e.target.value})
    }

    validateFormEditPersonnal() {
        let validate = {firstName: false, lastName: false ,birthday: false};

        this.setState({ errorMsg: "" });
        this.setState({ errorGender: "" });
        this.setState({ errorFirstname: "" });
        this.setState({ errorLastname: "" });
        this.setState({ errorBirthday: "" });

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
            let verifyBirthday = this.isDate(this.state.birthday);
            if(!verifyBirthday.success) {
                validate.birthday = false;
            } else {
                validate.birthday = true;
            }
        } else {
            validate.birthday = true;
        }
        console.log(validate)
        return !(validate.firstName === false || validate.lastName === false || validate.birthday === false)
    }

    handleSubmitPersonnal(e) {
        e.preventDefault();
        let valid = this.validateFormEditPersonnal();
        if(valid) {
            let userPersonnal = {
                gender: this.state.gender,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthday: this.state.birthday,
            }
            this.props.editPersonnalInfo(userPersonnal);
        }
    }

    render() {
        if(this.props.success) {
            window.location.href = "/user/profile";
        }
        return (
            <Fragment>
                <div className={"col-10 offset-1 mt-4"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <div className={"d-flex justify-content-center mt-4"}>
                                { this.props.user.gender === "men" ?
                                    <img src={menPicture} alt={"Profile"} className={"imgProfileTabs"}/>
                                    :null
                                }
                                { this.props.user.gender === "woman" ?
                                    <img src={womanPicture} alt={"Profile"} className={"imgProfileTabs"}/>:null
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
                        <div className={"col-12"}>
                            <h1 className={"text-center mt-4"}>Information personnelles</h1>
                            <div className={"row justify-content-center box__personnal mt-3 mb-4"}>
                                <div className={"col-10 offset-1"}>
                                    <form onSubmit={this.handleSubmitPersonnal}>
                                        <label className="register_label font_montserrat mb-4">Civilité <span className={"star"}>*</span></label>
                                        <div className="form-floating row mb-4">
                                            <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                <input type='radio' name="gender" id="men"
                                                    checked={this.state.gender === "men"} value={"men"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="men" className="register_label ms-2 ">Homme</label>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                <input type='radio' name="gender" id="woman" value={"woman"}
                                                       checked={this.state.gender === "woman"} onChange={this.handleChangeGender}/>
                                                <label htmlFor="woman" className="register_label ms-2">Femme</label>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                                                <input type='radio' name="gender" id="other" value={"other"} checked={this.state.gender === "other"}
                                                       onChange={this.handleChangeGender}/>
                                                <label htmlFor="other" className="register_label ms-2">Autres</label>
                                            </div>
                                        </div>
                                        <div className={"form-group mb-4"}>
                                            <label htmlFor={"firstname"} className={"Edit_label ps-0 pe-0"}>Prénom <span className={"star"}>*</span></label>
                                            <input type={"text"} id={"firstname"} className={"form-control Edit_input mt-1 ps-0 pe-0"} placeholder={"prénom"} value={this.state.firstName} onChange={this.handleChangeFirstname}/>
                                            {this.state.errorFirstname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorFirstname}/> :null
                                            }
                                        </div>

                                        <div className={"form-group mb-4"}>
                                            <label htmlFor={"lastname"}>Nom </label>
                                            <input type={"text"} id={"lastname"} className={"form-control Edit_input mt-1 ps-0 pe-0"} value={this.state.lastName} onChange={this.handleChangeLastname}/>
                                            {this.state.errorLastname.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorLastname}/> :null
                                            }
                                        </div>
                                        <div className={"form-group mb-4"}>
                                            <label htmlFor={"birthday"}>Date de naissance</label>
                                            <input type={"date"} id={"birthday"} className={"form-control Edit_input mt-1 ps-0 pe-0"} value={this.state.birthday} onChange={this.handleChangeBirthday}/>
                                            {this.state.errorBirthday.length > 0 ?
                                                <ErrorFormLittle error={this.state.errorBirthday}/> :null
                                            }
                                        </div>
                                        {this.props.error ?
                                                <ErrorForm error={this.props.error}/> :null
                                        }
                                        <div className={"row justify-content-center"}>
                                            <button
                                                className="btn btn--submit btn--edit btn--personnal"
                                                type={"submit"}>Modifier
                                                {this.props.isLoading ?
                                                    <div className="spinner-border spinner-border-sm ms-2 mb-1 text-light" role="status">
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        isLoading: state.userReducer.isLoading,
        error: state.userReducer.error,
        success: state.userReducer.success
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUser, editPersonnalInfo}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
