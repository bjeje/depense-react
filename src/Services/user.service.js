import axios from "axios";
import {Environment} from "../Constants/environment";
// import {GET_USER} from "../Redux/Constants/user.types";
import AuthService from "./auth.service";

const headers = {
    'Authorization': `Bearer ${AuthService.getCurrentAuth()}`
}

const userService = {
    getUser() {
         return axios.get(Environment.backUser, { headers: headers })
            // .then(res => {
            //     console.log(res.data)
            //     return res
            //     // dispatch({ type: GET_USER, payload: res.data })
            // })
            // .catch(error => {
            //     console.log(error.response)
            //     return error
            // });
    }
}

export default userService;
