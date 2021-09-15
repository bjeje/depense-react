import axios from "axios";
import {
    GET_USER_REQUEST,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    PUT_USER_LOGIN,
    PUT_USER_EMAIL,
    PUT_USER_PASSWORD,
    PUT_USER_BIRTHDAY,


} from "../Constants/user.types";

import {Environment} from "../../Constants/environment";
import AuthService from "../../Services/auth.service";
import userService from "../../Services/user.service";

const headers = {
    'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
}

const getUserRequest = () => ({
    type: GET_USER_REQUEST,
});

const getUserError = error => ({
        type: GET_USER_ERROR,
        payload: error
});

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

export const putUserLogin = (data) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updateLogin", {
            login: data
        },{ headers: headers })
        .then(res => {
        console.log(res.data)
        dispatch({ type: PUT_USER_LOGIN, payload: {login: data} })
        })
        .catch(error => {
            console.log(error.response)
        })
    }
}

export const putUserEmail = (data) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updateEmail", {
            email: data
        }, { headers: headers } )
            .then(res => {
            console.log(res.data)
            dispatch({ type: PUT_USER_EMAIL, payload: {email: data}})
        })
            .catch(error => {
            console.log(error.response)
        })
    }
}

export const putUserPassword = (password) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updatePassword", {
            password: password
        }, { headers: headers })
            .then(res => {
            console.log(res.data)
        })
            .catch(error => {
            console.log(error.response)
        })
    }
}

export const putUserBirthday = (data) => {
    return (dispatch) => {
        return axios.put(Environment.backUser + "updateBirthday", {
            birthday: data
        }, { headers: headers })
            .then(res => {
            console.log(res.data)
            dispatch({ type: PUT_USER_BIRTHDAY, payload: {...data} })
        })
            .catch(error => {
            console.log(error.response)
        })
    }
}

function getUserSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    };
}
