import React, {useContext} from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { Card, Button, Typography, Grid } from "@material-ui/core";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";


const EventItem = props => {
  const { userState } = useContext(UserContext);

  const { eventDetails, getEvents } = props;

  const DeleteEvent = () => {
    API.deleteEvent(eventDetails._id).then(()=>getEvents(userState.id));
  }

  return (
    <Card
      style={{
        margin: "10px",
        padding: "15px 20px"
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={9}>
          <Typography variant="h5" color="primary">
            {eventDetails.eventName}
          </Typography>

          <Typography variant="subtitle1">
            Date: {eventDetails.eventDate}
          </Typography>
          <Typography variant="subtitle2">
            Time: {eventDetails.eventTime}
          </Typography>

          <Grid item xs={12}>
            <Button
              variant="text"
              color="secondary"
              component={Link}
              to={`/events/${eventDetails._id}`}
            >
              Details
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid container border={1} justify="flex-end">
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                component={Link}
                to={`/vote/${eventDetails._id}`}
              >
                Vote
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="text"
                color="secondary"
                component={Link}
                to={`/result/${eventDetails._id}`}
              >
                Results
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="text"
                color="primary"
               onClick={DeleteEvent}
              >
              <DeleteIcon />
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventItem;
