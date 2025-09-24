const express = require("express");

const router = express.Router();
router.use("/customers", require("./customerRoutes"));
router.use('/ledger', require('./ledgerRoutes'));

module.exports = router;