const db = require("../models");
const axios = require("axios")

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Location.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Location.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Find all locations by using Event Id
  findByEventId: function(req, res) {
    db.Event.findById(req.params.id)
      .populate("location")
      .then(dbModel => res.json(dbModel.location));
  },
  create: function(req, res) {
    console.log("you are here");
    db.Location.create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        return db.Event.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { location: dbModel._id } }
        );
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Location.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Location.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  googleAPI: function(req, res) {
    const placeid = req.params.id;
    return axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeid + "&fields=name,website,rating,geometry,formatted_phone_number&key=AIzaSyASD8l4ED4-0lpLSgZ_fiHTr9XvBm4SYH4"
    )
    .then(model => res.status(200).json(model.data)).catch(err => res.status(422).json(err));
  }
};
