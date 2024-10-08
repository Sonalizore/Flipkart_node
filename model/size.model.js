module.exports = (Sequelize, sequelize) => {

    const model = sequelize.define("size", {

        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },

        size: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false
        },

        status: {
            type: Sequelize.DataTypes.ENUM('Active', 'inActive'),
            defaultValue: 'Active'
        },
      
    },

        {
            freezeTableName: true
        });

    return model

}