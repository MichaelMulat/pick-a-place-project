import React, { useState, useEffect, Component, useContext } from "react";
import ResultItem from "../ResultItem";
import { Grid, List, Typography, Button, Link } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../MapContainer";
import UserContext from "../../utils/UserContext";

const ResultList = props => {
  const { userState } = useContext(UserContext);
  const { eventId, event, locations } = props;
  const [state, setState] = useState({
    step: 1,
  });

  let resultStage;

  const nextStep = () => {
    const currentStep = state.step;
    setState({ ...state, step: currentStep + 1 });
  };

if (state.step === 1) {
resultStage = (
  <Grid container spacing={24} justify="center" style={{ margin: "30px 0px" }}>
    <Grid item xs={12} lg={8}>
      {locations.map(location => (
        <ResultItem
          key={location._id}
          name={location._id}
          state={state}
          type="vote"
          location={location}
        />
      ))}
    </Grid>
  </Grid>
);
  
}
  console.log("Attendees", event.attendees)
  console.log("Locations", locations);

  return (
    <Grid
      container
      spacing={16}
      justify="center">
      {resultStage}
    </Grid>
  );
};

export default ResultList;
