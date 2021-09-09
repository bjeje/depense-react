import React, {Component, Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";
import './navbar.scss';
import logoDepense from "../../../Assets/logo/logoDepense.png";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import { getUser } from "../../../Redux/Actions/user.actions";
import auth from "../../../Services/auth.service";
import men from "../../../Assets/profil/men.jpg";
import woman from "../../../Assets/profil/woman.jpg";
import undefinedUser from "../../../Assets/profil/undefined-user.png";
import loader from "../../../Assets/loader/loader.gif"

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgWoman: woman,
            imgMen: men,
            imgOther: undefinedUser,
            redirect: false,
        }
        this.disconnect = this.disconnect.bind(this);
    }

    componentDidMount() {
        this.props.getUser();
    }

    disconnect() {
        auth.logout();
        this.setState({ redirect: true });
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to="/login" />
        }

        return (
            <Fragment>
                <nav className="navbar navbar-expand-md navbar-light bg-navbar">
                    <div className="container-fluid">
                        <Link to={"/"}><img src={logoDepense} alt={"Logo"} className={"logo-navbar"}/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <form className="d-flex ">
                                    <input className="form-control me-2" type="search" placeholder="Rechercher"
                                           aria-label="Search"/>
                                    <button className="btn btn--seek" type="submit">Rechercher</button>
                            </form>
                        </div>
                        {this.props.isLoading?
                            <p>Chargement du profil <img src={loader} alt={"chargement"} className={"loader"}/></p>:null
                        }
                        <div className="dropdown">
                            <a className="dropdown-toggle last--link profile__firstname" role="button"
                               id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                {this.props.user.firstName}
                                { this.props.user.gender === "male" ?
                                    <img src={this.state.imgMen} alt={"Profile"} className={"imgProfile"}/>:null
                                }
                                { this.props.user.gender === "woman" ?
                                    <img src={this.state.imgWoman} alt={"Profile"} className={"imgProfile"}/>:null
                                }
                                { this.props.user.gender === "other" ?
                                    <img src={this.state.imgOther} alt={"Profile"} className={"imgProfile"}/>:null
                                }
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item" onClick={this.disconnect}><i className="icon--off fas fa-power-off"/>Déconnexion</a></li>
                                {this.props.user.admin?
                                    <li><Link to={"/admin/manageUsers"} className="dropdown-item">
                                        <i className="icon--admin fas fa-users-cog"/> Gestion user</Link></li>:null
                                }

                                <li><Link to={"/user/profile"} className="dropdown-item"><i className="icon--user far fa-user"/> Mon profil</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        isLoading: state.userReducer.isLoading,
        error: state.userReducer.error
    };

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getUser: getUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
