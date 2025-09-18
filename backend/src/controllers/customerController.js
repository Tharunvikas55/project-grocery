const CustomerModel = require("../models/Customer");
const Sequelize = require('sequelize');
const express = require('express');
const { Op } = Sequelize;

getCustomerCount = async (req, res) => {
    try {
        const count = await CustomerModel.count();
        res.status(200).json(count);
    } catch (error) {
        console.error("Error getting customer count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

getCustomer = async (req, res) => {
    try {
        const { search } = req.query;
        const searchQuery = search ? search.trim() : null;
        let where = {};

        if (searchQuery) {
            where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${searchQuery}%` } },
                    { address: { [Op.like]: `%${searchQuery}%` } },
                    { phone: { [Op.like]: `%${searchQuery}%` } }
                ]
            };
        }
        const customers = await CustomerModel.findAll({ where });
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error getting customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

postCustomer = async (req, res) => {
    try {
        const { username, email, phone, address, district, state, zip, role, image } = req.body;

        if (!username || !email || !phone || !address) {
            return res.status(400).json({ message: "Username, email, phone, and address are required." });
        }

        const existingCustomer = await CustomerModel.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { phone }]
            }
        });

        if (existingCustomer) {
            return res.status(409).json({ message: "Customer with this email or phone already exists." });
        }

        const newCustomer = await CustomerModel.create({
            name: username,
            email,
            phone,
            address,
            district,
            state,
            pincode: zip,
            role,
            image
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

fetchAddress = async (req, res) => {
    try {

        const address = await CustomerModel.findAll({ attributes: ['address'] });
        res.status(200).json(address);
        // const { address, phone } = req.query;

        // const filters = {};
        // if (address) {
        //     filters.address = { [Sequelize.Op.iLike]: `%${address}%` };
        // }
        // if (phone) {
        //     filters.phone = { [Sequelize.Op.iLike]: `%${phone}%` };
        // }

        // const customers = await CustomerModel.findAll({ where: filters });
        // res.status(200).json(customers);
    } catch (error) {
        console.error("Error filtering customers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getCustomerCount,
    getCustomer,
    postCustomer,
    fetchAddress
};