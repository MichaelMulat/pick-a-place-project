import React, { useContext, useEffect, useState } from "react";
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import UserContext from "../../utils/UserContext";
import VoteList from "../../components/VoteList";
import { Typography } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../../components/MapContainer";
import ProfileInfo from "../../components/ProfileInfo";
import { Paper } from "@material-ui/core";

function Vote({ match }) {
  const [event, updateEvent] = useState({
    eventName: "",
    eventDate: null,
    eventTime: null,
    hostId: "",
    hostFirstName: "",
    hostLastName: "",
    attendees: []
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

          attendees: res.data.attendees
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

  return (
    <div>
      <Grid container spacing={16} justify="center">
        <Grid item xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper shadow={0} style={{ padding: "20px" }}>
            <Typography variant="h1" color="primary">
              Vote
            </Typography>
            <Typography variant="h3" gutterBottom={true}>
              {event.eventName}
            </Typography>

            <Typography variant="subtitle1">
              Hosted by: {event.hostFirstName} {event.hostLastName} - Date:{" "}
              {event.eventDate} - Time: {event.eventTime}
            </Typography>
          </Paper>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={6}>
            <VoteList eventId={eventId} event={event} locations={locations} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Vote;
