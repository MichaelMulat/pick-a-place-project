import React, { useState, useEffect, Component } from "react";
import { Card, Typography, List, ListItem, Grid, CardActions, Button, CardContent, Link, ButtonBase } from "@material-ui/core";
import API from "../../utils/API";
import CheckIcon from "@material-ui/icons/Check";

const LocationItem = props => {
  const { state, location, type, pickLocation } = props;

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
        <Typography variant="h5">{place.locationName}</Typography>
        <Typography>{place.address}</Typography>
        <Typography>{place.phone}</Typography>
      </CardContent>

      <CardActions>
        <Button href={place.website} target="blank">
          Visit Website
        </Button>
        {type === "vote" ? (
          <Button
            // variant={
            //   state.pickedplaceId === location._id ? "outlined" : "text"
            // }
            color={state.pickedplaceId === location._id ? "primary" : "text"}
            name={location._id}
            onClick={pickLocation}
          >
            {state.pickedplaceId === location._id ? (
              <div>
                Picked
                <CheckIcon />
              </div>
            ) : (
              <div>Pick</div>
            )}
          </Button>
        ) : (
          <Button>...</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default LocationItem;
