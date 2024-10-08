module.exports = (Sequelize, sequelize) => {

    const model = sequelize.define("master", {

        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        Name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
            unique:true,
        },

        description: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
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