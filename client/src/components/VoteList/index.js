import React, { useState, useEffect, Component } from "react";
import LocationItem from "../LocationItem";
import { Grid, List } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../MapContainer";

const VoteList = props => {
  const { eventId, locations } = props;
  const [state, setState] = useState({
    step: 1,
    pickedplaceId: ""
  });

  const pickLocation = e => {
    e.preventDefault();
    const { name } = e.target;
    setState({
      pickedplaceId: name
    });
  };

  console.log("picked place", state.pickedplaceId);

  let voteStage;
  if (state.step === 1){
    voteStage = (
      <form>

        
      </form>
    )
  }


  return (
    <Grid container spacing={16} justify="center" style={{}}>
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
    </Grid>
  );
};

export default VoteList;
