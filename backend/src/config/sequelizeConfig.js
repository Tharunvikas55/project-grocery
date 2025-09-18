const { Sequelize } = require("sequelize");
const config = require('../../config/config');
const sequelize = new Sequelize(config);

sequelize.authenticate()
    .then(() => console.log("✅ Database connected"))
    .catch(err => console.error("❌ Unable to connect:", err));
module.exports = sequelize;
