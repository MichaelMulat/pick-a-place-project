import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import UserContext from "../../utils/UserContext";
import { Link } from "react-router-dom";

function NavBar(props) {

  const {userState, logout} = useContext(UserContext)
  
  console.log("Navbar", userState.loggedIn)
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            href="/"
            style={{ flexGrow: 1 }}
            variant="h6"
            color="inherit"
          >
            pick-a-place
          </Typography>

          {/* Display Logout button if logged in */}
          <div>
            {userState.loggedIn && (
              <div>
                <Button component={Link} to="/" variant="text" color="inherit">
                  home
                </Button>
                <Button variant="text" onClick={logout} color="inherit">
                  Log out
                </Button>

               
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
