import React, { useState, useEffect, Component, useContext } from "react";
import LocationItem from "../LocationItem";
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

  console.log("Attendees", event.attendees)

  return (
    <Grid
      container
      spacing={16}
      justify="center"
      style={{ margin: "30px 10px" }}
    >
      {resultStage}
    </Grid>
  );
};

export default ResultList;
