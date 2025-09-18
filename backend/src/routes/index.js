const express = require("express");

const router = express.Router();

router.use("/customers", require("./customerRoutes"));

module.exports = router;