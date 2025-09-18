const express = require('express');
const { getCustomerCount,postCustomer,fetchAddress, getCustomer }=require('../controllers/customerController');

const customerRouter = express.Router();


customerRouter.get('/', getCustomer);
customerRouter.get('/address', fetchAddress);
customerRouter.get('/count', getCustomerCount);

customerRouter.post('/', postCustomer);

module.exports = customerRouter;