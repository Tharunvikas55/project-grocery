const express = require('express');
const { getLedgerByCustomerId,insertNewLedger } = require('../controllers/ledgerController');

const ledgerRouter = express.Router();

ledgerRouter.get("/:customerId", getLedgerByCustomerId);
ledgerRouter.post("/addnewledger", insertNewLedger);

module.exports = ledgerRouter;