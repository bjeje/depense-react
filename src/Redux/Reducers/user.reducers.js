import {
    GET_USER_REQUEST,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    PUT_USER_LOGIN,
    PUT_USER_EMAIL,
    PUT_USER_PASSWORD,
    PUT_USER_BIRTHDAY,
} from "../Constants/user.types";

const initialState = {
    isLoading: false,
    user: {},
    error: ''
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                user: {},
                isLoading: true,
                error: ''
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isLoading: false,
                error: ''
            };
        case GET_USER_ERROR:
            return {
                ...state,
                user: {},
                isLoading: false,
                error: ''
            }
        case PUT_USER_LOGIN:
            return state;
        case PUT_USER_EMAIL:
            return state;
        case PUT_USER_PASSWORD:
            return state;
        case PUT_USER_BIRTHDAY:
            return state;
        default: return state;
    }
}
