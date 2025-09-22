const express = require('express');
const { getCustomerCount,postCustomer, getCustomer,getCustomerById,updateCustomer,deleteCustomerById }=require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.get('/', getCustomer);
customerRouter.get('/count', getCustomerCount);
customerRouter.get('/:id', getCustomerById);
customerRouter.post('/', postCustomer);
customerRouter.put('/:id', updateCustomer);
customerRouter.delete('/:id', deleteCustomerById);

module.exports = customerRouter;