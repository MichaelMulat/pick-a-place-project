import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LocationData from "../../components/LocationData";
import { Typography, Button } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../../components/MapContainer";
import ProfileInfo from "../../components/ProfileInfo";
import { Fab, Paper } from "@material-ui/core";
import ResultList from "../../components/ResultList";
import UserContext from "../../utils/UserContext";


function Result({ match }) {
  const { userState } = useContext(UserContext);
  const [event, updateEvent] = useState({
    eventName: "",
    eventDate: null,
    eventTime: null,
    hostId: "",
    hostFirstName: "",
    hostLastName: "",
    attendees: [],
    isClosed: false
  });

  const [locations, updateLocations] = useState([]);

  const eventId = match.params.eventId;

  useEffect(() => {
    API.getEvent(eventId)
      .then(res => {
        updateEvent({
          eventName: res.data.eventName,
          eventDate: res.data.eventDate,
          eventTime: res.data.eventTime,
          hostId: res.data.author._id,
          hostFirstName: res.data.author.firstName,
          hostLastName: res.data.author.lastName,
          attendees: res.data.attendees,
          isClosed: res.data.isClosed
        });
        console.log("event data for list", res.data);
      })
      .then(() => getLocations(eventId));
  }, []);

  const getLocations = eventId => {
    API.getEventLocations(eventId)
      .then(res => updateLocations(res.data))
      .catch(err => console.log(err));
  };

  const endVoting = () => {
    console.log("Clicked")
    API.endVote({
      isClosed: true
    }, eventId)
  }

  return (
    <Grid container spacing={16} justify="center">
      <Grid item xs={12}>
        <ProfileInfo />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper shadow={0} style={{ padding: "20px" }}>
          <Typography variant="h1" color="primary">
            Result
          </Typography>
          <Typography variant="h3" gutterBottom={true}>
            {event.eventName}
          </Typography>

          <Typography variant="subtitle1">
            Hosted by: {event.hostFirstName} {event.hostLastName} - Date:{" "}
            {event.eventDate} - Time: {event.eventTime}
          </Typography>
          {userState.id === event.hostId && (
            <Grid item xs={12}>
              <Button variant="contained"
              color="primary"
              onClick={endVoting}> End Voting</Button>
            </Grid>
          )}
        </Paper>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} lg={8}>
          <ResultList eventId={eventId} event={event} locations={locations} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Result;
