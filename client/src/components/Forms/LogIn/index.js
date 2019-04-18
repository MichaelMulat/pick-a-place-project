import React from "react";
import { Button, Grid, Typography, Fab } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import UserContext from "../../../utils/UserContext";

function Login(props) {

  return (
    <UserContext.Consumer>
      {({ handleInputChange, logInUser }) => (
        <div style={{
          margin: "40px 0px"
        }}>
          <form className="">
            <Grid container alignItems="flex-end" spacing={16}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  fullWidth
                  name="username"
                  label="Username"
                  className="username"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  type="password"
                  fullWidth
                  name="password"
                  label="Password"
                  className=""
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={6}>
                <Button
                  fullWidth
                  onClick={logInUser}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="sign-in-button"
                  margin="normal"
                >
                {/* <AccountCircle/> */}
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Login;
