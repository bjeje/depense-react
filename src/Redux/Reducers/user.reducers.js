import {
    GET_USER_REQUEST,
    GET_USER_ERROR,
    GET_USER_SUCCESS,
    EDIT_USER_LOGIN,
    EDIT_USER_EMAIL,
    EDIT_USER_PASSWORD,
    EDIT_USER_PASSWORD_SUCCESS,
    EDIT_USER_PASSWORD_ERROR,
    EDIT_USER_BIRTHDAY,
    SET_SUCCESS_FALSE,
} from "../Constants/user.types";

const initialState = {
    isLoading: false,
    user: {},
    error: '',
    success: false
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_REQUEST: //GET USER INFO
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
        case EDIT_USER_LOGIN: // EDIT LOGIN
            return {
                ...state, user: { ...state.user,
                    login: action.payload.login,
                }
            }
        case EDIT_USER_EMAIL: // EDIT EMAIL
            return {
                ...state, user: { ...state.user,
                    email: action.payload.email,
                }
            }
        case EDIT_USER_PASSWORD: // EDIT PASSWORD
            return {
                ...state,
                success: false,
                isLoading: true,
                error: ''
            }
        case EDIT_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                success:true,
                isLoading: false,
            };
        case EDIT_USER_PASSWORD_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case EDIT_USER_BIRTHDAY: // EDIT PERSONNAL INFO
            return state;
        case SET_SUCCESS_FALSE: // EDIT SUCCESS TO FALSE
            return {
                ...state,
                success: action.payload.success
            };
        default: return state;
    }
}
