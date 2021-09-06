import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import './navbar.scss';
import logoDepense from "../../../Assets/logo/logoDepense.png";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import { getUser } from "../../../Redux/Actions/user.actions";
import men from "../../../Assets/profil/men.jpg";
import woman from "../../../Assets/profil/woman.jpg";

class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgWoman: woman,
            imgMen: men,
            imgOther: "",
        }
        this.goToLogin = this.goToLogin.bind(this)
    }

    componentDidMount() {
        this.props.getUser();
    }

    goToLogin(event) {
        event.preventDefault();
        this.setState({goTo: "/login"})
    }

    render() {
        // changer le verif token par route Secure
        let connected = localStorage.getItem('depenseToken');

        return (

                <Fragment>
                { connected ?
                <nav className="navbar navbar-expand-lg navbar-light bg-navbar">
                    <div className="container-fluid">
                        <Link to={"/"}><img src={logoDepense} className={"logo-navbar"}/></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <Link to={"/profile"} className={"last--link"}>{this.props.user.firstName}
                            { this.props.user.gender === "male" ?
                                <img src={this.state.imgMen} className={"imgProfile"}/>:null
                            }
                            { this.props.user.gender === "woman" ?
                                <img src={this.state.imgWoman} className={"imgProfile"}/>:null
                            }
                            { this.props.user.gender === "other" ?
                                <img src={this.state.imgWoman} className={"imgProfile"}/>:null
                            }
                        </Link>
                    </div>
                </nav> : null
                }
                    {this.props.isLoading?
                        <p>je charge ...</p>:null
                    }
                <div>

                    <p>hey</p> {this.props.user.firstName ?
                    <p>{this.props.user.login}</p>:null
                        }

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
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
