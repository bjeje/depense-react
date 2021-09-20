import './bodyModal.scss';
import {userConstants} from "../../../Constants/user/user.constants";
import ErrorForm from "../../error/ErrorForm";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import React, { useEffect, useState } from 'react';
import {connect, useDispatch} from "react-redux";
import { environment } from '../../../Constants/environment'
import {editUserEmail} from "../../../Redux/Actions/user.actions";

export const ModalEditEmail = ({ handleCloseEmail, show, emailUser }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [redirection, setRedirection] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(show) {
        }
    }, [show]);

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        let canSend = true;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let verifyMail = re.test(String(email).toLowerCase());

        if(!verifyMail) {
            setEmailError(userConstants.userError.EMAIL_ERROR);
            canSend = false;
        }

        if(canSend) {
            dispatch(editUserEmail(email))
            setEmail("");
            setRedirection(true)
        }
    }

    if (redirection) {
        handleCloseEmail();
        setRedirection(false)
    }

    return (
        <div className={showHideClassName}>
            <section className="modal__main">
                <div className={"box__add"}>
                    <div>
                        <h5 className={"add__title text-center title--modal"}>Changer votre email</h5>
                        <div className={"d-flex justify-content-end"}>
                            <button type="button" className="btn btn--close" onClick={handleCloseEmail}>
                                <i className="fas fa-times icon--close"/>
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <div className="add__body">
                        <p className={"text-center text--modal"}>Email actuel: <span
                            className={"fw-bold"}>{emailUser}</span></p>
                        <form onSubmit={handleSubmitEmail}>
                            <div className="form-group">

                                <div className={"box__nbr"}>
                                    <label htmlFor={"email"} className={"title--modal mb-1"}>Email</label>
                                    <input type="text" className="form-control input__login"
                                           onChange={event => setEmail(event.target.value)}
                                           value={email}
                                           id={'email'}
                                    />
                                    {emailError && emailError.length > 1 ?
                                        <ErrorFormLittle error={emailError}/>:null
                                    }
                                </div>
                                {errorMsg && errorMsg.length > 1 ?
                                    <ErrorForm error={errorMsg}/>:null
                                }
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
    email: state.user.email,
})

const mapDispatchToProps = { editUserEmail };

export default connect(mapStateToProps,mapDispatchToProps)(ModalEditEmail)
