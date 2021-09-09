import React, {Component, Fragment} from 'react';
import './tabsProfile.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUser} from "../../Redux/Actions/user.actions";
import MyProfile from "./MyProfile/myProfile";

class TabsProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileSelect: true,
            editSelect: false,
            verifEmailSelect: false,
            logHistorySelect: false,
            deleteUserSelect: false,
        }
        this.handleMyProfile = this.handleMyProfile.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleVerifEmail = this.handleVerifEmail.bind(this);
        this.handleLogHistory = this.handleLogHistory.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    desactivateTabs(focus) { // desactivate unclickedLink Function
        if(focus !== "my_profile") {
            this.setState({ profileSelect: false });
            this.displayFalse("my_profile")
        }

        if(focus !== "edit_profile") {
            this.setState({ editSelect: false });
            this.displayFalse("edit_profile")
        }

        if(focus !== "verif_email") {
            this.setState({ verifEmailSelect: false });
            this.displayFalse("verif_email")
        }

        if(focus !== "log_history") {
            this.setState({ logHistorySelect: false });
            this.displayFalse("log_history")
        }

        if(focus !== "delete_user") {
            this.setState({ deleteUserSelect: false });
            this.displayFalse("delete_user")
        }
    }

    compareSelected(tabsClicked){ //activate clicked link and desactivate unClicked link

        switch(tabsClicked) {
            case "my_profile":
                if(this.state.profileSelect !== true ) {
                    this.desactivateTabs("my_profile");
                    this.setState({profileSelect: true});
                    this.displayTrue("my_profile")
                }
                break;
            case "edit_profile":
                if(!this.state.editSelect) {
                    this.desactivateTabs("edit_profile");
                    this.setState({editSelect: true});
                    this.displayTrue("edit_profile")
                }
                break;
            case "verif_email":
                if(this.state.verifEmailSelect !== true ) {
                    this.desactivateTabs("verif_email");
                    this.setState({verifEmailSelect: true});
                    this.displayTrue("verif_email")
                }
                break;
            case "log_history":
                if(this.state.logHistorySelect !== true ) {
                    this.desactivateTabs("log_history");
                    this.setState({logHistorySelect: true});
                    this.displayTrue("log_history")
                }
                break;
            case "delete_user":
                if(this.state.profileSelect !== true ) {
                    this.desactivateTabs("delete_user");
                    this.setState({deleteUserSelect: true});
                    this.displayTrue("delete_user")
                }
                break;
            default:
                break;
        }
    }

    displayTrue(inputID) {
        let element = document.getElementById(inputID)
        element.classList.add('active--profile');
    }

    displayFalse(inputID) {
        let element = document.getElementById(inputID)
        element.classList.remove('active--profile');
    }

    handleMyProfile() {
        this.compareSelected("my_profile");
    }

    handleEditProfile() {
        this.compareSelected("edit_profile");
    }

    handleVerifEmail() {
        this.compareSelected("verif_email");
    }

    handleLogHistory() {
        this.compareSelected("log_history");
    }

    handleDeleteUser() {
        this.compareSelected("delete_user");
    }

    render() {
        return (
            <Fragment>
                <div className={"container-fluid main--bg"}>
                    <div className={"container"}>
                        <div className={"col-12"}>
                            <div className={"row"}>
                                <div className={"col-10 offset-1 box__user mt-5 mb-5"}>
                                    <div className={"row"}>
                                        <div className={"col-12"}>
                                            <nav>
                                                <div className={"box__tabs"}>
                                                    <button id={"my_profile"} className={"tabs__profile active--profile"} onClick={this.handleMyProfile}>
                                                        <i className="icon--profile viewProfile--icon far fa-user"/>
                                                        {/* Mon Profil */}
                                                    </button>
                                                    <button id={"edit_profile"} className={"tabs__profile"} onClick={this.handleEditProfile}>
                                                        <i className="icon--profile edit--icon fas fa-user-edit"/>
                                                        {/*Editer le profil*/}
                                                    </button>
                                                    <button id={"verif_email"} className={"tabs__profile"} onClick={this.handleVerifEmail}>
                                                        <i className="icon--profile email--icon fas fa-at"/>
                                                        {/*Vérif. Email*/}
                                                    </button>
                                                    <button id={"log_history"} className={"tabs__profile"} onClick={this.handleLogHistory}>
                                                        <i className="icon--profile history--icon far fa-id-badge"/>
                                                        {/*Historique log*/}
                                                    </button>
                                                    <button id={"delete_user"} className={"tabs__profile"} onClick={this.handleDeleteUser}>
                                                        <i className="icon--profile delete--icon fas fa-user-times"/>
                                                        {/*Supprimer*/}
                                                    </button>
                                                </div>
                                                <hr className={"border--simple"}/>
                                            </nav>
                                        </div>
                                    </div>
                                    {this.state.profileSelect ?
                                            <MyProfile/> :null
                                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(TabsProfile);
