import React, {Component, Fragment} from 'react';
import './myProfile.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../../Redux/Actions/user.actions";
import men from "../../../Assets/profil/men.jpg";
import woman from "../../../Assets/profil/woman.jpg"
import undefinedUser from "../../../Assets/profil/undefined-user.png";
import loader from "../../../Assets/loader/loader.gif"
import dayjs from "dayjs";

class MyProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            transformDate: null,
            adminStyleIdentity: "text-center fw-bold mt-2 mt-md-0 mt-lg-2 mb-1 pt-2 pt-md-0 pt-lg-2 identity--admin",
            userStyleIdentity: "text-center fw-bold mb-1 mt-2 pt-2",
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <Fragment>
                <div className={"col-12"}>
                    <div className={"row mt-4"}>
                        {this.props.isLoading?
                            <p className={"d-flex justify-content-center fw-bold"}>Chargement du profil <img src={loader} alt={"chargement"} className={"loader"}/></p>:null
                        }
                        <div className={"col-md-5 col-sm-12"}>
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
                            <div className={"row"}>
                                {this.props.user.admin ?
                                    <div className={"col-2 col-md-12 col-lg-2 offset-2 offset-md-0 offset-lg-2 d-md-flex d-lg-block justify-content-center"}>
                                        <i className="fas fa-user-shield admin__connected ps-2 pt-3"/>
                                        <p className={"text-danger fw-bold pt-md-4 pt-lg-0 ps-md-2 ps-lg-0"}>Admin</p>
                                    </div>:null
                                }
                                <div className={this.props.user.admin? "col-8 col-md-12 col-lg-8": "col-12"}>
                                    <p className={this.props.user.admin? this.state.adminStyleIdentity: this.state.userStyleIdentity}>{this.props.user.firstName} {this.props.user.lastName}</p>
                                    <p className={"text-center"}>{this.props.user.email}</p>
                                </div>

                            </div>
                        </div>
                        <div className={"col-md-7 col-sm-12"}>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <div className={"row stripped--line"}>
                                        <p className={"col-5 line title-profile"}>Pseudo</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        <p className={"col-6 col-md-5 line"}>{this.props.user.login}</p>
                                    </div>
                                    <div className={"row"}>
                                        <p className={"col-5 line title-profile"}>Nom</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        { this.props.user.lastName? <p className={"col-6 col-md-5 line"}>{this.props.user.lastName}</p>: <p className={"col-5 line fst-italic undefined--color"}>Inconnu</p> }
                                    </div>
                                    <div className={"row stripped--line"}>
                                        <p className={"col-5 line title-profile"}>Prénom</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        <p className={"col-6 col-md-5 line"}>{ this.props.user.firstName }</p>
                                    </div>
                                    <div className={"row"}>
                                        <p className={"col-5 line title-profile"}>Email</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        <p className={"col-6 col-md-5 line"}>{ this.props.user.email }</p>
                                    </div>
                                    <div className={"row stripped--line"}>
                                        <p className={"col-5 line title-profile"}>Status email</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        {this.props.user.emailStatus === "Waiting" ?
                                            <p className={"col-6 col-md-5 line fst-italic fw-bold text-danger"}>A valider</p>
                                            :null
                                        }
                                        {this.props.user.emailStatus === "Checked" ?
                                            <p className={"col-6 col-md-5 line"}><i className="email--checked far fa-check-circle"/></p>
                                            :null
                                        }
                                    </div>
                                    <div className={"row"}>
                                        <p className={"col-5 line title-profile"}>Role</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        {this.props.user.role === "UnCheck"?
                                            <p className={"col-6 col-md-5 line text-warning fw-bold"}>En attente</p>:null
                                        }
                                    </div>
                                    <div className={"row stripped--line"}>
                                        <p className={"col-5 line title-profile"}>Sexe</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        {this.props.user.gender === "male"?
                                            <p className={"col-6 col-md-5 line"}>homme</p>:null
                                        }
                                        { this.props.user.gender === "woman"?
                                            <p className={"col-6 col-md-5 line"}>femme</p>:null
                                        }
                                        { this.props.user.gender === "other"?
                                            <p className={"col-6 col-md-5 line fst-italic undefined--color"}>Inconnu</p>:null
                                        }
                                    </div>
                                    <div className={"row"}>
                                        <p className={"col-5 line title-profile"}>Date de naissance</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        { this.props.user.birthday ?
                                            <p className={"col-6 col-md-5 line"}>{ dayjs(this.props.user.birthday).format('DD/MM/YYYY')}</p>
                                            : <p className={"col-6 col-md-5 line fst-italic undefined--color"}>Inconnu</p>
                                        }
                                    </div>
                                    <div className={"row pb-2 stripped--line"}>
                                        <p className={"col-5 line title-profile"}>status compte</p>
                                        <p className={"col-1 col-md-2 line"}>:</p>
                                        {this.props.user.accountStatus === "Unvalid" ?
                                            <p className={"col-6 col-md-5 line fw-bold text-warning"}>En attente</p>
                                            :null
                                        }
                                        {this.props.user.accountStatus === "Checked" ?
                                            <p className={"col-6 col-md-5 line"}><i className="account--icon far fa-check-circle"/></p>:null
                                        }
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

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        isLoading: state.userReducer.isLoading,
        error: state.userReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUser: getUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
