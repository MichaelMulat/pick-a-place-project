import axios from "axios";

export default {
  //Users
  //******************************** */

  // Get user
  getUser: function() {
    console.log("Getting User ...");
    return axios.get("/api/user/");
  },

  // Save new User
  saveUser: function(userData) {
    console.log("Saving User ... ");
    return axios.post("/api/user/signup", userData);
  },

  loginUser: function(userData) {
    return axios.post("/api/user/login", userData);
  },

  logoutUser: function(event) {
    console.log("we are at the API");
    return axios.post("/api/user/logout");
  },

  addEventToUser: function(req){
    console.log("avent to user req", req)
    return axios.post("/api/event/user/"+ req.userId, req)
  },

  // Events
  //******************************** */

  // Gets all events fot that user
  getUserEvents: function(userId) {
    return axios.get("/api/event/user/" + userId);
  },

  getEvent: function(eventId) {
    return axios.get("/api/event/" + eventId)
  },
  // Deletes the book with the given id
  deleteEvent: function(id) {
    console.log("deleting")
    return axios.delete("/api/event/" + id);
  },
  // Saves a book to the database
  saveEvent: function(eventData) {
    console.log(eventData, "event data");
    return axios.post("/api/event/" + eventData.author, eventData);
  },

  //Save a location
  saveLocation: function(locationData, eventId) {
    console.log("event id in url", eventId);
    return axios.post("/api/location/event/" + eventId, locationData);
  },

  getEventLocations: function(eventId) {
    return axios.get("/api/location/event/" + eventId);
  },

  queryPlaceId: function(locationId) {
    console.log("Getting google places data")
    return axios.get("/api/location/placesGoogle/" + locationId);
  }


};
