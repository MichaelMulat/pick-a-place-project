import React, { useState } from "react";
import Login from "../../components/Forms/LogIn";
import SignUp from "../../components/Forms/SignUp";
import { Grid, Typography } from "@material-ui/core";
import img from "./img/juggling_home.png";
import Link from "@material-ui/core/Link";

function Authenticate(props) {
  const [formView, changeView] = useState({
    loginForm: true
  });
  console.log(formView.loginForm);

  const loadForm = () => {
    if (formView.loginForm) {
      changeView({
        loginForm: false
      });
      console.log(formView.loginForm);
    } else if (!formView.loginForm) {
      changeView({
        loginForm: true
      });
    }
  };

  return (
    <div>
      <Grid
        container
        alignItems="center"
        style={{ maxWidth: "1200px", margin: "auto" }}
      >
        <Grid item xs={12} sm={6}>
          {formView.loginForm ? (
            <React.Fragment>
              <Typography variant="h1" color="secondary">
                Tired of juggling locations for your next event?
              </Typography>
              <Typography variant="h2" color="primary">
                Let your guests decide for you!
              </Typography>

              <Login {...props} />

              <Typography variant="caption">
                Don't have an account yet?{"  "}
                <Link onClick={loadForm}>Sign Up Here.</Link>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h1" color="secondary">
                <div>Sign up now.</div> It's Free!
              </Typography>
              <Typography variant="h2" color="primary">
                Until I figure out how to monitize this.
              </Typography>

              <SignUp {...props} />

              <Typography variant="caption" color="secondary">
                Already have an account{"   "}
                <Link onClick={loadForm}>Log in</Link>
              </Typography>
            </React.Fragment>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid
            container
            alignItems="flex-end"
            style={{ maxHeight: "600px", margin: "auto" }}
          >
            <Grid item>
              <img
                style={{ maxHeight: "600px", marginTop: "auto" }}
                src={img}
                alt="juggling person"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Authenticate;
