import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import UserContext from "../../utils/UserContext";
import EventList from "../../components/EventList";
import { Fab, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import ProfileInfo from "../../components/ProfileInfo";

function Welcome(props) {
  const { userState } = useContext(UserContext);

  console.log(userState);
  return (
    <Grid container spacing={16} justify="center">
      <Grid item xs={12}>
        <ProfileInfo />
      </Grid>
      <Grid item className="user-events" xs={12} sm={8}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={8}>
            <Paper shadow={0} style={{ padding: "20px" }}>
              <Typography component="h3" variant="h3">
                Events
              </Typography>

              <Fab
                component={Link}
                to="/create"
                style={{
                  position: "relative",
                  bottom: "20px",
                  left: "80%"
                }}
                color="primary"
                aria-label="Create"
              >
                <AddIcon />
              </Fab>

              <EventList />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Welcome;
