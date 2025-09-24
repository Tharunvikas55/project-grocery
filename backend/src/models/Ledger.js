const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeConfig"); const CustomerModel = require('./Customer');


const LedgerModel = sequelize.define('Ledger', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    transaction_type: {
        type: DataTypes.ENUM('Purchase', 'Payment'),
        allowNull: false
    },
    payment_mode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'ledgers',
    timestamps: true,

});
LedgerModel.associate = (models) => {
    LedgerModel.belongsTo(models.Customer, { foreignKey: 'customer_id' });
};


module.exports = LedgerModel;