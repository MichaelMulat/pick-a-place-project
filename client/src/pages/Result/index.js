import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LocationData from "../../components/LocationData";
import { Typography } from "@material-ui/core";
import API from "../../utils/API";
import MapContainer from "../../components/MapContainer";
import ProfileInfo from "../../components/ProfileInfo";
import { Fab, Paper } from "@material-ui/core";

function Result({ match }) {
  const [event, updateEvent] = useState({
    eventName: "",
    eventDate: null,
    eventTime: null,
    attendees: []
  });
  const eventId = match.params.eventId;

  useEffect(() => {
    API.getEvent(eventId).then(res => {
      updateEvent({
        eventName: res.data.eventName,
        eventDate: res.data.eventDate,
        eventTime: res.data.eventTime,
        attendees: res.data.attendees
      });
      console.log("event data for list", res.data);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={16} justify="center">
        <Grid item xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper shadow={0} style={{ padding: "20px" }}>
            <Typography variant="h3">{event.eventName}</Typography>
            <Typography variant="subtitle1">
              <span>Date: {event.eventDate}</span>
              <span>Time: {event.eventTime}</span>
            </Typography>

            <Grid item xs={12} sm={6}>
              <LocationData eventId={eventId} />
            </Grid>

            <Grid item>
              <MapContainer />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Result;
