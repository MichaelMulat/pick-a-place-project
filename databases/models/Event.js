const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
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
      userIds: {
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

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
