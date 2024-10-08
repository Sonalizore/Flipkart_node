module.exports = (Sequelize, sequelize) => {
    const model = sequelize.define('user', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        freezeTableName: true,
    });
    return model
}