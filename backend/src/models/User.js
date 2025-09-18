const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeConfig")

const UserModel = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "staff"), allowNull: false, defaultValue: "staff" },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    tableName: "users",
    timestamps: true
})


module.exports = UserModel;
