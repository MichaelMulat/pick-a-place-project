import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../utils/UserContext";

function ProtectedRoute({ component: Component, ...rest }) {
  
  const { userState } = useContext(UserContext);
  
  // console.log("protectedRoute", userState)
  return (
    <Route
      {...rest}
      render={props => userState.loadingUser === true ? (console.log("Loading")) :
        userState.loggedIn ? <Component {...props} /> : <Redirect to="/"/>
      }
    />
  );
}

export default ProtectedRoute;
