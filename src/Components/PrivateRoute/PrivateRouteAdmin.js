import { Redirect, Route} from "react-router-dom";
import AuthService from "../../Services/auth.service";

function PrivateRouteAdmin({ component: Component, ...restOfProps }) {
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                AuthService.isAdmin() ? <Component {...props} name={restOfProps.name} state={restOfProps} /> : <Redirect to="/"/>
            }
        />
    );
}

export default PrivateRouteAdmin;
