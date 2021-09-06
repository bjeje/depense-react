import { Redirect, Route} from "react-router-dom";
import AuthService from "../../Services/auth.service";

function PrivateRouteUser({ component: Component, ...restOfProps }) {
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                AuthService.isLogin() ? <Component {...props} name={restOfProps.name} state={restOfProps} /> : <Redirect to="/login"/>
            }
        />
    );
}

export default PrivateRouteUser;
