const CustomerModel = require("../models/Customer");
const Sequelize = require('sequelize');
const express = require('express');
const { Op } = Sequelize;

getCustomerCount = async (req, res) => {
    try {
        const count = await CustomerModel.count();
        res.status(200).json({ success: true, data: count, message: "Customer Count fetched successfully" });
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
        res.status(200).json({ success: true, data: customers, message: "Customer data fetched successfully" });
    } catch (error) {
        console.error("Error getting customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params.id);

        const customers = await CustomerModel.findOne({
            where: {
                id: id
            }
        });
        res.status(200).json({ success: true, data: customers, message: "Customer fetched successfully" });
    } catch (error) {
        console.error("Error getting customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

postCustomer = async (req, res) => {
    try {
        const { username, email, phone, address, district, state, pincode, role, image } = req.body;

        if (!username || !email || !phone || !address) {
            return res.status(400).json({ success: false, message: "Username, email, phone, and address are required." });
        }

        const existingCustomer = await CustomerModel.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { phone }]
            }
        });

        if (existingCustomer) {
            return res.status(409).json({ success: false, message: "Customer email or phone already exists." });
        }

        await CustomerModel.create({
            name: username,
            email,
            phone,
            address,
            district,
            state,
            pincode,
            role,
            image
        });

        res.status(201).json({ success: true, message: "New customer added successfully" });
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, district, state, pincode, role, image } = req.body;

        const existingCustomer = await CustomerModel.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { phone }], id: { [Op.ne]: id }
            }
        });

        if (!existingCustomer) {
            return res.status(409).json({ message: "Customer does not exists." });
        }

        const updatedCustomer = await CustomerModel.update({
            name,
            email,
            phone,
            address,
            district,
            state,
            pincode,
            role,
            image
        }, {
            where: {
                id: id
            }
        });

        if (!updatedCustomer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({ success: false, message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};

deleteCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const existingCustomer = await CustomerModel.findOne({
            where: {
                id
            }
        });

        if (!existingCustomer) {
            return res.status(409).json({ success: false, message: "Customer not exists." });
        }
        console.log(existingCustomer);

        const response = await CustomerModel.destroy({
            where: {
                id
            }
        });

        res.status(200).json({ success: true, message: "customer deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

module.exports = {
    getCustomerCount,
    getCustomer,
    getCustomerById,
    postCustomer,
    updateCustomer, deleteCustomerById
};