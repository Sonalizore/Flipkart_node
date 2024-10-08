module.exports=(Sequelize,sequelize)=>{

    const model= sequelize.define('product',{
      id:{
        type:Sequelize.DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },

      Name:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false, 
      },
      proImage: {
        type: Sequelize.DataTypes.STRING(500), // Adjust the length as needed
        allowNull: false,
      },

      description:{
        type:Sequelize.DataTypes.STRING(300),
        allowNull:false,
      },

      
      brand:{
        type:Sequelize.DataTypes.STRING(500),
        allowNull:false,
      },

      price:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
      },

      discount:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
      },
      
      productDetail:{
        type:Sequelize.DataTypes.STRING(3000),
        allowNull:false
      },
      extraDetail:{
        type:Sequelize.DataTypes.STRING(3000),
        allowNull:false
      },
      specification:{
        type:Sequelize.DataTypes.STRING(3000),
        allowNull:false
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