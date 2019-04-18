const router = require("express").Router();
const eventController = require("../../controllers/eventController");

// Matches with "/api/events"
router
  .route("/")
  .get(eventController.findAll)
  // .post(eventController.create);

// Matches with "/api/event/:id"
router
  .route("/:id")
  .post(eventController.create)
  .get(eventController.findById)
  .put(eventController.update)
  .delete(eventController.remove);


  // Matches with "/api/event/user/:id"
router
  .route("/user/:id")
  .post(eventController.addEventToUser)
  .get(eventController.findByUserId);
module.exports = router;
