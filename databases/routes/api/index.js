const router = require("express").Router();
const eventRoutes = require("./events");
const locationRoutes = require("./locations") 
const userRoutes = require("./users"); 

// Event routes
router.use("/event", eventRoutes);


// User routes
router.use("/user", userRoutes);

// location routes
router.use("/location", locationRoutes)

module.exports = router;
