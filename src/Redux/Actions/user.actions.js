import axios from "axios";
import {
    GET_USER_REQUEST,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    EDIT_USER_LOGIN,
    EDIT_USER_EMAIL,
    EDIT_USER_PASSWORD,
    EDIT_USER_PASSWORD_ERROR,
    EDIT_USER_PASSWORD_SUCCESS,
    EDIT_PERSONNAL_INFO,
    EDIT_PERSONNAL_INFO_ERROR,
    EDIT_PERSONNAL_INFO_SUCCESS,
    SET_SUCCESS_FALSE,

} from "../Constants/user.types";

import {Environment} from "../../Constants/environment";
import AuthService from "../../Services/auth.service";
// import userService from "../../Services/user.service";

const headers = {
    'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
}
// GET USER INFO
const getUserRequest = () => ({
    type: GET_USER_REQUEST,
});

const getUserError = error => ({
        type: GET_USER_ERROR,
        payload: error
});

// EDIT USER PASSWORD
const putUserPassword = () => ({
    type: EDIT_USER_PASSWORD,
})

const editUserPasswordSuccess = (success) => ({
    type: EDIT_USER_PASSWORD_SUCCESS,
    payload: success
});

const editUserPasswordError = error => ({
    type: EDIT_USER_PASSWORD_ERROR,
    payload: error
});

// EDIT PERSONNAL INFO

export const getUser = ()  => {
         return async (dispatch) => {
             dispatch(getUserRequest())
             await axios.get(Environment.backUser, { headers: headers })
                 .then((res) => {
                     // console.log(res.data)
                     dispatch(getUserSuccess(res.data))
                 })
                 .catch((error) => {
                     console.log(error.response)
                     dispatch(getUserError(error.response))
                 });
         }
}

export const editUserLogin = (data) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updateLogin", {
            login: data
        },{ headers: headers })
        .then(res => {
        console.log(res.data)
        dispatch({ type: EDIT_USER_LOGIN, payload: {login: data} })
        })
        .catch(error => {
            console.log(error.response)
        })
    }
}

export const editUserEmail = (data) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updateEmail", {
            email: data
        }, { headers: headers } )
            .then(res => {
            console.log(res.data)
            dispatch({ type: EDIT_USER_EMAIL, payload: {email: data}})
        })
            .catch(error => {
            console.log(error.response)
        })
    }
}

export const editUserPassword = (password, newPassword) => {
    return (dispatch) => {
         dispatch(putUserPassword());
        return axios.put(Environment.backUser + "updatePassword", {
            password: password,
            newPassword: newPassword
        }, { headers: headers })
            .then((res) => {
            console.log(res.data)
               dispatch(editUserPasswordSuccess(res.data.success))
        })
            .catch((error) => {
                console.log(error)
                dispatch(editUserPasswordError(error.response.data.error))
        })
    }
}

export const setSuccessFalse = () => {
    return (dispatch) => {
         return dispatch({type: SET_SUCCESS_FALSE, payload: { success: false}})
    }
}

export const editPersonnalInfo = (data) => {
    return (dispatch) => {
        dispatch({ type: EDIT_PERSONNAL_INFO })
        return axios.put(Environment.backUser + "updatePersonnalInfo", {
            gender: data.gender,
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: data.birthday,
        }, { headers: headers })
            .then(res => {
            console.log(res.data)
            dispatch({ type: EDIT_PERSONNAL_INFO_SUCCESS, payload: data })
        })
            .catch(error => {
            console.log(error.response)
            dispatch({ type: EDIT_PERSONNAL_INFO_ERROR, payload: error.response.data })
        })
    }
}

function getUserSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    };
}
