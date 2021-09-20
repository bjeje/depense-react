import './bodyModal.scss';
import {userConstants} from "../../../Constants/user/user.constants";
import ErrorFormLittle from "../../error/ErrorFormLittle";
import React, {useEffect, useRef, useState} from 'react';
import {editUserPassword, setSuccessFalse} from "../../../Redux/Actions/user.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import ErrorForm from "../../error/ErrorForm";

export const ModalEditPassword = ({ handleClosePassword, show }) => {
    const dispatch = useDispatch();
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const success = useSelector((state) => state.userReducer.success);
    const isLoading = useSelector((state) => state.userReducer.isLoading);
    const errorMsg = useSelector((state) => state.userReducer.error)
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [canSend, setCanSend] = useState(true);

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // componentDidMount logic
            mounted.current = true;
            setCanSend(true);
        } else {
            // componentDidUpdate logic
            if(success) {
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
                handleClosePassword();
                dispatch(setSuccessFalse());
            }
        }
    });


    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setPasswordError("")
        setConfirmPasswordError("")
        let canSendAwait = true;
        if(!canSend) {
            canSendAwait = await setCanSend(true);
        }

        if(newPassword.length < 8 || newPassword.length > 100) {
            canSendAwait = await setCanSend(false);
            setPasswordError(userConstants.userError.PASSWORD_ERROR_LENGHT);
        }

        if(newPassword !== confirmPassword) {
            console.log("rentré diff")
            canSendAwait = await setCanSend(false);
            setConfirmPasswordError(userConstants.userError.PASSWORD_CONFIRM_ERROR);
        }

        if(canSendAwait) {
            dispatch(editUserPassword(password, newPassword))
        }
    }

    return (
        <div className={showHideClassName}>
            <section className="modal__main">
                <div className={"box__add"}>
                    <div>
                        <h5 className={"add__title text-center title--modal"}>Changer votre mot de passe</h5>
                        <div className={"d-flex justify-content-end"}>
                            <button type="button" className="btn btn--close" onClick={handleClosePassword}>
                                <i className="fas fa-times icon--close"/>
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <div className="add__body">
                        <form onSubmit={handleSubmitPassword}>
                            <div className="form-group">

                                <div className={"box__nbr"}>
                                    <label htmlFor={"oldPassword"} className={"title--modal mb-2"}>Ancien mot de passe</label>
                                    <input type="password" className="form-control input__password mb-3"
                                           value={password}
                                           onChange={event => setPassword(event.target.value)}
                                           id={'oldPassword'}
                                    />
                                    <label htmlFor={"password"} className={"title--modal mb-2"}>Nouveau mot de passe</label>
                                    <input type="password" className="form-control input__password mb-3"
                                           value={newPassword}
                                           onChange={event => setNewPassword(event.target.value)}
                                           id={'password'}
                                    />
                                    {passwordError && passwordError.length > 1 ?
                                        <ErrorFormLittle error={passwordError}/>:null
                                    }
                                    <label htmlFor={"confirmPassword"} className={"title--modal mb-2"}>Confirmer le mot de passe</label>
                                    <input type="password" className="form-control input__password"
                                           value={confirmPassword}
                                           onChange={event => setConfirmPassword(event.target.value)}
                                           id={'confirmPassword'}
                                    />
                                    {confirmPasswordError && confirmPasswordError.length > 1 ?
                                        <ErrorFormLittle error={confirmPasswordError}/>:null
                                    }
                                </div>
                                {errorMsg && errorMsg.length > 1 ?
                                    <div className={"mt-4"}>
                                        <ErrorForm error={errorMsg}/>
                                    </div>
                                    :null
                                }
                                <div className={"d-flex justify-content-center mt-4"}>
                                    <button
                                        className="btn btn--submit btn--edit"
                                        type={"submit"}>Modifier
                                        {isLoading ?
                                            <div className="spinner-border spinner-border-sm ms-2 mb-1 text-light" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> :null
                                        }
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.userReducer.isLoading,
        error: state.userReducer.error,
        success: state.userReducer.success,
    }
}

const mapDispatchToProps = { editUserPassword, setSuccessFalse };

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPassword);
