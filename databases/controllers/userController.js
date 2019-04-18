const db = require("../models");

// Defining methods for the UserController
module.exports = {
  // @logout
  logout: function(req, res) {
    console.log("logging out...", req.user);
    if (req.user) {
      req.logout();
      res.send({ msg: "logging out" });
    } else {
      res.send({ msg: "no user to log out" });
    }
  },
  // @login
  login: function(req, res) {
    var userInfo = {
      username: req.body.username,
      sessionId: res.req.sessionID,
      userData: res.req.user
    };
    console.log(userInfo);
    res.send(userInfo);
  },

  //@getUser
  getUser: function(req, res) {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
      res.json({
        user: req.user
      });
    } else {
      res.json({ user: null });
    }
  },

  //@ Create a new user
  create: function(req, res) {
    const { firstName, lastName, username, password } = req.body;

    // basic validation

    if (!firstName || !lastName || !username || !password) {
      return res.status(400).json({ msg: "Please Complete all fields" });
    }

    db.User.findOne({ username: username }, (err, user) => {
      if (user) {
        res.status(400).json({
          msg: "Username already exists"
        });
      } else {
        db.User.create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
    });
  },

  
};
