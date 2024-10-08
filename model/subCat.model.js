module.exports=(Sequelize, sequelize)=>{

    const model=sequelize.define('subCat',{

        id:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        Name:{
            type:Sequelize.DataTypes.STRING(500),
            allowNull:false,   
            unique:true,
        },
        status: {
            type:Sequelize. DataTypes.ENUM('Active', 'inActive'),
            defaultValue: 'Active'
          },

    },
    {
        freezeTableName: true,
    });

    return model
}