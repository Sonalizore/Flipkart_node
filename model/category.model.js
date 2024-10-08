module.exports=(Sequelize,sequelize)=>{

    const model=sequelize.define('category',{

        id:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        Name:{
            type:Sequelize.DataTypes.STRING(100),
            allowNull:false,
            isAlpha: true, 
       
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