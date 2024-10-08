const { reviews } = require(".");

module.exports = (Sequelize, sequelize) => {

    const model = sequelize.define("reviews", {

        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        reviews: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },

        rating: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },

        status: {
           type:Sequelize. DataTypes.ENUM('Active', 'inActive'),
            defaultValue: 'Active'

        },

        image: {
            type: Sequelize.DataTypes.STRING(500), // Adjust the length as needed
            allowNull: false,
        },
        
    },

        {
            freezeTableName: true
        });

    return model

}