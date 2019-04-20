const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  isclosed: {type: Boolean, default: false},
  location: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location"
    }
  ],
  author: 
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ,
  attendees: [ 
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      votedFor: {
        type: Schema.Types.ObjectId,
        ref: "Location"
      }
    }
  ]
});

const Event = mongoose.model("Event", eventSchema, "Event");

module.exports = Event;
