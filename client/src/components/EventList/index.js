import React, { useState , useContext, useEffect} from "react";
import List from "@material-ui/core/List";
import API from "../../utils/API";
import EventItem from "../EventItem";
import UserContext from "../../utils/UserContext";


const EventList = (props) => {
  const { userState } = useContext(UserContext);
  const [ events, updateEvents] = useState([])

  useEffect(() => {
    getEvents(userState.id)
  }, [])

  const getEvents = (userId) => {
    API.getUserEvents(userId).then(res => (
      updateEvents(res.data)
    ))
  }
    return (

        <List component="nav">
          {events.map(event => (
            <EventItem key={event._id} eventDetails={event} getEvents={getEvents}/>
          ))}
        </List>
  
    );
}

export default EventList;
