// const dbConfig = require("../config/config");
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//     dbConfig.database,
//     dbConfig.username,
//     dbConfig.password,
//     {
//         host: dbConfig.host,
//         dialect: dbConfig.dialect,
//         port: dbConfig.port,
//         pool: dbConfig.pool,
//         dialectOptions: {
//             options: dbConfig.options
//         }
//     }
// )

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.User = require('./User')(sequelize, Sequelize);
// db.Customer = require('./Customer')(sequelize, Sequelize);

// sequelize.authenticate()
//   .then(() => console.log("✅ Database connected"))
//   .catch(err => console.error("❌ Unable to connect:", err));


// module.exports = db; 