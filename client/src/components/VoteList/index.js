import React, { useState, useEffect, Component, useContext } from "react";
import LocationItem from "../LocationItem";
import { Grid, List, Typography, Button } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../MapContainer";
import UserContext from "../../utils/UserContext";

const VoteList = props => {

  const {userState} = useContext(UserContext)

  const { eventId, locations } = props;
  const [state, setState] = useState({
    step: 1,
    pickedplaceId: ""
  });

  const pickLocation = e => {
    e.preventDefault();
    const { name } = e.target;
    setState({...state,
      pickedplaceId: name
    });
  };

  console.log("picked place", state.pickedplaceId);

  let voteStage;

  const submitVote = e => {
    API.voteLocation({
      userId : userState.id,
      votedFor: state.pickedplaceId
    }, eventId);
  };

  const nextStep = e => {
    e.preventDefault();
    setState({ ...state, step: 2 });
  }


  if (state.step === 1) {
    voteStage = (
      <Grid container spacing={16} justify="center" style={{}}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h3" color="secondary">
            Will you be able to attend this event?
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth={true}
            onClick={nextStep}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth={true} variant="contained" color="primary">
            No
          </Button>
        </Grid>
      </Grid>
    );
  } else if (state.step === 2) {
    voteStage = (
      <Grid
        container
        spacing={16}
        justify="center"
        style={{ margin: "30px 10px" }}
      >
        <Grid item xs={12}>
          {locations.map(location => (
            <LocationItem
              key={location._id}
              name={location._id}
              state={state}
              pickLocation={pickLocation}
              type="vote"
              location={location}
            />
          ))}
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth={true}
            onClick={submitVote}
            variant="contained"
            color="secondary"
          >
            Submit Vote
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={16} justify="center" style={{margin: "30px 10px"}}>
      {voteStage}
    </Grid>
  );
};

export default VoteList;
