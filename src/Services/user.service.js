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
    }
}

export default userService;
