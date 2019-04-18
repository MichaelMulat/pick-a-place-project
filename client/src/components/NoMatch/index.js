import React from "react";
import ProfileInfo from "../ProfileInfo";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid"

const NoMatch = props => {
  return (
    <Grid container spacing={16} justify="center">
      <Grid item xs={12}>
        <ProfileInfo />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        style={{
          marginTop: "40px"
        }}
      >
        <Typography variant="h1" color="primary">
          Not Sure how you got here but you should head back
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoMatch;
