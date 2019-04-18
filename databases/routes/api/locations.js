const router = require("express").Router();
const locationController = require("../../controllers/locationController");

// Matches with "/api/location"
router.route("/").get(locationController.findAll);

// Match with "/api/location/event/:id"
router.route("/event/:id").post(locationController.create).get(locationController.findByEventId);

// Matches with "/api/locations/:id"
router
  .route("/:id")
  .get(locationController.findById)
  .put(locationController.update)
  .delete(locationController.remove);

  router.route("/placesGoogle/:id").get(locationController.googleAPI);

module.exports = router;
