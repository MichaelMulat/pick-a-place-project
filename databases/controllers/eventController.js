const db = require("../models");

// Defining methods for the Ee
module.exports = {
  findAll: function(req, res) {
    console.log(req.query);
    db.Event.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.User.findById(req.params.id)
    .populate("events")
      .then(dbModel => res.json(dbModel.events))
      .catch(err => res.status(422).json(err));
  },

  findById: function(req, res) {
    db.Event.findById(req.params.id)
      .populate("location")
      .then(dbModel =>
        res.json(dbModel)
      )
      .catch(err => res.status(422).json(err));
  },
  //Create
  create: function(req, res) {
    db.Event.create(req.body)
      .then(dbModel =>
        // console.log(dbModel))
        res.json(dbModel._id)
      )
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Event.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    
    db.Event.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addEventToUser: function(req, res) {
    console.log("addEvent function called", req.body);
    db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { events:  req.body.eventId} }
    ).then(
      console.log(res.data)
    ).catch(err => console.log(err));
  }
};
