import './bodyModal.scss';
import {userConstants} from "../../../Constants/user/user.constants";
// import ErrorForm from "../../error/ErrorForm";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import React, {useEffect, useRef, useState} from 'react';
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { editUserLogin } from "../../../Redux/Actions/user.actions";
import { verifyLogin } from "../../../Verify/verifyUser";

export const ModalEditLogin = ({ handleCloseLogin, show, userLogin }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [redirection, setRedirection] = useState(false);
    // const [errorMsg, setErrorMsg] = useState("");
    const [login, setLogin] = useState('');
    const [loginError, setLoginError] = useState('');
    const dispatch = useDispatch();

    const mounted = useRef();
    useEffect(() => {
        if(!mounted) { // componentDidMount logic

        } else { // componentDidUpdate logic
            if(showHideClassName === "modal display-none") {
                setLoginError("");
                setLogin("");
            }
        }
    }, [show]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if(!verifyLogin(login).success) {
            setLoginError(verifyLogin(login).errorMsg)
        } else {
            dispatch(editUserLogin(login));
            setLogin("");
            setRedirection(true)
        }
    }

    if (redirection) {
        handleCloseLogin();
        setRedirection(false)
    }

    return (
            <div className={showHideClassName}>
                <section className="modal__main">
                    <div className={"box__add"}>
                        <div>
                            <h5 className={"add__title text-center title--modal"}>Changer votre login</h5>
                            <div className={"d-flex justify-content-end"}>
                                <button type="button" className="btn btn--close" onClick={handleCloseLogin}>
                                    <i className="fas fa-times icon--close"/>
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <div className="add__body">
                            <p className={"text-center text--modal"}>Login actuel: <span
                                className={"fw-bold"}>{userLogin}</span></p>
                            <form onSubmit={handleSubmitLogin}>
                                <div className="form-group">

                                    <div className={"box__nbr"}>
                                        <label htmlFor={"login_input"} className={"title--modal mb-1"}>Login</label>
                                        <input type="text" className="form-control input__login"
                                               onChange={event => setLogin(event.target.value)}
                                               value={login}
                                               id={'login_input'}
                                        />
                                        {loginError && loginError.length > 1 ?
                                            <ErrorFormLittle error={loginError}/>:null
                                        }
                                    </div>
                                    {/*{errorMsg && errorMsg.length > 1 ?*/}
                                    {/*    <ErrorForm error={errorMsg}/>:null*/}
                                    {/*}*/}
                                    <div className={"d-flex justify-content-center mt-4"}>
                                        <button
                                                className="btn btn--submit btn--edit"
                                                type={"submit"}>Modifier
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
    );
};

const mapStateToProps = state => ({
    login: state.user.login,
})

const mapDispatchToProps = { editUserLogin };

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditLogin)
