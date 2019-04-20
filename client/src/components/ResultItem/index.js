import React, { useState, useEffect, Component } from "react";
import { Card, Typography, List, ListItem, Grid, CardActions, Button, CardContent, Link, ButtonBase } from "@material-ui/core";
import API from "../../utils/API";
import CheckIcon from "@material-ui/icons/Check";

const ResultItem = props => {
  const { state, location } = props;

  const [place, updatePlace] = useState({
    _id: "",
    locationId: "",
    address: "",
    locationName: "",
    latitude: "",
    longitude: ""
  });

  useEffect(() => {
      API.queryPlaceId(location.locationId)
        .then(res => {
          console.log("results", res);
          updatePlace({
            _id: location._id,
            locationId: location.locationId,
            address: location.address,
            locationName: res.data.result.name,
            latitude: res.data.result.geometry.location.lat,
            longitude: res.data.result.geometry.location.lng,
            rating: res.data.result.rating,
            website: res.data.result.website,
            phone: res.data.result.formatted_phone_number
          });
        })
        .catch(err => console.log(err));
  }, [location]);


  return (
    <Card
      style={{
        width: "100%",
        margin: "10px",
        backgroundColor: {}
      }}
    >
      <CardContent>
        <Grid container spacing={16}>
          <Grid item xs={8}>
            <Typography variant="h5">{place.locationName}</Typography>
            <Typography>{place.address}</Typography>
            <Typography>{place.phone}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Number of Votes: {location.votes}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button href={place.website} target="blank">
          Visit Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResultItem;
