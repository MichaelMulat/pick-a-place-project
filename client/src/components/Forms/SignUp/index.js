import React, { useContext } from "react";
// import Typography from "@material-ui/core/Typography";
import { Button, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import UserContext from "../../../utils/UserContext";

function SignUp() {
  const { handleInputChange, signUpUser } = useContext(UserContext);

  return (
    <main className="main-container">
      <div
        style={{
          margin: "40px 0px"
        }}
      >
        <form className="">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <TextField
                // value={this.state.firstName}
                onChange={handleInputChange}
                fullWidth
                name="firstName"
                label="First Name"
                className=""
                autoComplete="fname"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                // value={this.state.lastName}
                onChange={handleInputChange}
                fullWidth
                name="lastName"
                label="Last Name"
                className=""
                autoComplete="lname"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                // value={this.state.username}
                onChange={handleInputChange}
                fullWidth
                name="username"
                label="Username"
                className=""
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="password"
                // value={this.state.password}
                onChange={handleInputChange}
                fullWidth
                name="password"
                label="Password"
                className=""
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                onClick={signUpUser}
                fullWidth
                variant="contained"
                color="primary"
                className="sign-up-button"
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </main>
  );
}
export default SignUp;
