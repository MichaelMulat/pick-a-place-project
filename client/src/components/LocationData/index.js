import React, { useState, useEffect, Component } from "react";
import LocationItem from "../LocationItem";
import { Grid, List } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../MapContainer";

const LocationData = props => {
  const { eventId, locations } = props;

  console.log(eventId, locations);

  return (
    <Grid container spacing={16} justify="center"
    style={{
    }}>
      <Grid item xs={12} sm={6}>
        <List component="nav">
          {locations.map(location => (
            <LocationItem
              key={location._id}
              location={location}
            />
          ))}
        </List>{" "}
      </Grid>

      <Grid item xs={12} sm={12}>
        {/* <MapContainer eventId={eventId} locations={locations} /> */}
      </Grid>
    </Grid>
  );
};

export default LocationData;
