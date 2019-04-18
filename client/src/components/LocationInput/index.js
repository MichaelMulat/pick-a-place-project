import React, { useState } from "react";
import { Grid, Typography, Paper, InputBase } from "@material-ui/core";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import API from "../../utils/API";

const MY_API_KEY = "AIzaSyASD8l4ED4-0lpLSgZ_fiHTr9XvBm4SYH4";

const LocationInput = props => {
  
  const { eventId, getLocations } = props;
  console.log(props)

  
  const [state, setState] = useState({
    search: "",
    address: "",
    location: "",
    locationId: "",
    locationInfo: ""
  });

  const handleInputChange = e => {
    setState({ search: e.target.value, address: e.target.value });
  };

  const handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    console.log("Address", geocodedPrediction); // eslint-disable-line
    setState({
      ...state,
      search: "",
      address: geocodedPrediction.formatted_address,
      locationId: geocodedPrediction.place_id
    });
  };

  const getLocationInfo = id => {
    API.queryPlaceId(id).then(res => {
      console.log(res);
      setState({ ...state,
        locationInfo: res.data.result.name });
    });
  };

  const handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };

  const createLocation = event => {
    event.preventDefault();
    console.log(state.address, state.locationId, eventId);
    if (state.address && state.locationId) {
      API.saveLocation(
        {
          address: state.address,
          locationId: state.locationId
        },
        eventId
      ).then(()=> getLocations(eventId))
        .then(() => {
          setState({
            address: "",
            search: ""
          })
        })
        .catch(error => {
          console.log("submit error", error);
        });
    }
  };

  return (
    <Grid container alignItems="flex-end" spacing={24}>
      <Grid item xs={12}>
        <GoogleMapLoader
          params={{
            key: MY_API_KEY,
            libraries: "places,geocode"
          }}
          render={googleMaps =>
            googleMaps && (
              <GooglePlacesSuggest
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: state.search
                }}
                // Optional props
                onNoResult={handleNoResult}
                onSelectSuggest={handleSelectSuggest}
                textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                customRender={prediction => (
                  <div className="customWrapper">
                    <Typography variant="subtitle1">
                      {prediction
                        ? prediction.description
                        : "My custom no results text"}
                    </Typography>
                  </div>
                )}
              >
                <Paper
                  style={{
                    margin: "20px 5px",
                    padding: "5px 5px 5px 30px",
                    display: "flex"
                  }}
                >
                  <InputBase
                    style={{
                      flexGrow: 1
                    }}
                    onChange={handleInputChange}
                    name="search"
                    value={state.address}
                    placeholder="Search a location"
                    className="event-input"
                  />
                  <IconButton aria-label="Search" onClick={createLocation}>
                    <AddIcon />
                  </IconButton>
                </Paper>
              </GooglePlacesSuggest>
            )
          }
        />
      </Grid>

      
    </Grid>
  );
};

export default LocationInput;
