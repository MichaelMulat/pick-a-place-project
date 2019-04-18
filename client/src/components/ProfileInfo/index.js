import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import UserContext from "../../utils/UserContext";
import { Grid, Avatar } from "@material-ui/core";


function ProfileInfo(props) {

  const {userState} = useContext(UserContext)
  return (
    <Grid
      container
      spacing={16}
      justify="center"
      style={{ backgroundColor: "#EB4D52", margin: "0px 0px -40px", paddingBottom: "30px" }}
    >
      <Grid item xs={12} sm={6}>
        <Grid container justify="center" alignItems="flex-end">
          <Grid item>
            <Avatar
              style={{ width: "100px", height: "100px" , margin:"auto"}}
              alt={userState.username}
              src={userState.imageUrl}
            />
            <Typography
              style={{ textTransform: "capitalize" , textAlign: "center"}}
              gutterBottom
              variant="h4"
            >
              {userState.firstName} {userState.lastName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileInfo;
