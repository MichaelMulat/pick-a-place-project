import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Grid, InputBase } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import LocationInput from "../../components/LocationInput";
import LocationData from "../../components/LocationData";
import ProfileInfo from "../../components/ProfileInfo";
import  FileCopy from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";


const Create = props => {
  const { userState } = useContext(UserContext);

  const [state, setState] = useState({
    step: 1,
    eventName: "",
    eventDate: null,
    eventTime: null,
    author: ""
  });

  const [locations, updateLocations] = useState([]);

  const [eventId, changeId] = useState("");

  const handleInputChange = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const updateStep = () => {
    setState({
      ...state,
      step: state.step + 1
    });
  };

  const copyLink = () => {

  }

  console.log("Where am I", window.location.hostname)

  const createEvent = event => {
    event.preventDefault();
    console.log("clicked", state);
    if (state.eventName && state.eventDate && state.eventTime) {
      API.saveEvent({
        eventName: state.eventName,
        eventDate: state.eventDate,
        eventTime: state.eventTime,
        author: userState.id
      })
        .then(res => {
          const newEventId = res.data;
          changeId(newEventId);
          return res.data;
        })
        .then(res => {
          console.log(res);
          API.addEventToUser({
            userId: userState.id,
            eventId: res
          });
        })
        .then(() => {
          updateStep();
        })
        .catch(error => {
          console.log("submit error", error);
        });
    } else {
      console.log("no submit");
    }
  };

  const getLocations = eventId => {
    API.getEventLocations(eventId)
      .then(res => updateLocations(res.data))
      .catch(err => console.log(err));
  };


  let formstage;

  // if step = 1 show
  if (state.step === 1) {
    formstage = (
      <Paper
        style={{
          margin: "-10px auto",
          padding: "10px 20px"
        }}
      >
        <Typography component="h1" variant="h3" color="secondary">
          Create New Event
        </Typography>

        <form className="">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                name="eventName"
                label="Name of Event"
                className="event-input"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                type="date"
                name="eventDate"
                variant="outlined"
                label="Date of Event"
                className="event-date-input"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleInputChange}
                fullWidth
                type="time"
                name="eventTime"
                variant="outlined"
                label="Time of Event"
                className="event-date-input"
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className="next"
                onClick={createEvent}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  } else if (state.step === 2) {
    formstage = (
      <Paper
        style={{
          margin: "-10px auto",
          padding: "10px 20px"
        }}
      >
        <Typography component="h1" variant="h3" color="primary">
          Suggest locations{" "}
        </Typography>

        <LocationInput eventId={eventId} getLocations={getLocations} />
        <LocationData eventId={eventId} locations={locations} />

        <Grid container />
        <Grid item xs={12} sm={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="next"
            onClick={updateStep}
          >
            Next
          </Button>
        </Grid>
      </Paper>
    );
  } else if (state.step === 3) {
    formstage = (
      <Paper
        style={{
          margin: "-10px auto",
          padding: "10px 20px"
        }}
      >
        <Typography component="h1" variant="h3" color="secondary">
          Invite Guests{" "}
        </Typography>
        <Typography component="h1" color="primary">
          Copy and send the link below to invite your friends{" "}
        </Typography>
        <Paper
          style={{
            padding: "10px"
          }}
        >
          <InputBase
            style={{
              flexGrow: 1
            }}
            onChange={handleInputChange}
            name="inviteLink"
            value="/vote/"
            className="event-input"
          />
          <IconButton aria-label="copyLink" onClick={copyLink}>
            <FileCopy />
          </IconButton>
        </Paper>
      </Paper>
    );
  }

  return (
    <main>
      <Grid container spacing={16} justify="center">
        <Grid item xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item xs={12} sm={6}>
          {formstage}
        </Grid>
      </Grid>
    </main>
  );
};

export default Create;
