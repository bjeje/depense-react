import './bodyModal.scss';
import {userConstants} from "../../../Constants/user/user.constants";
import ErrorForm from "../../error/ErrorForm";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {editUserEmail} from "../../../Redux/Actions/user.actions";
import { verifyEmail } from "../../../Verify/verifyUser";

export const ModalEditEmail = ({ handleCloseEmail, show, emailUser }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [redirection, setRedirection] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();

    const mounted = useRef();
    useEffect(() => {
        if(!mounted) { // componentDidMount logic

        } else { // componentDidUpdate logic
            if(showHideClassName === "modal display-none") {
                setEmailError("");
                setEmail("");
            }
        }
    }, [show]);

    const handleSubmitEmail = (e) => {
        e.preventDefault();

        if(!verifyEmail(email).success) {
            setEmailError(verifyEmail(email).errorMsg);
        } else {
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
                                    <label htmlFor={"email_input"} className={"title--modal mb-1"}>Email</label>
                                    <input type="text" className="form-control input__login"
                                           onChange={event => setEmail(event.target.value)}
                                           value={email}
                                           id={'email_input'}
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
