const express = require('express');
const LedgerModel = require('../models/Ledger');

getLedgerByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params;

        const data = await LedgerModel.findAll({
            where: {
                customer_id: customerId
            }
        });
        console.log(data);
        
        
        res.status(200).json({ success: true, data: data, message: "Ledger data fetched successfully" })

    } catch (err) {
        console.error("Error getting ledger:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

insertNewLedger = async (req, res) => {
    try {
        console.log(req.body);
        const { newLedgerDetails, customerId } = req.body;
        console.log('newLedgerDetails', newLedgerDetails);
        console.log('customerId', customerId);
        console.log('first', parseInt(newLedgerDetails.amount));
        const { description, transaction_type, amount, payment_mode } = newLedgerDetails;

        await LedgerModel.create({
            description: description,
            transaction_type: transaction_type,
            payment_mode: payment_mode,
            amount: parseInt(amount),
            customer_id: parseInt(customerId)
        });

        res.status(200).json({ success: true, data: [], message: "Inserted Successfully" });

    } catch (err) {
        console.error("Error creating ledger:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {
    getLedgerByCustomerId, insertNewLedger
}