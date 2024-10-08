module.exports=(Sequelize,sequelize)=>{
    const model=sequelize.define("color",{

        id:{
            type:Sequelize.DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },

        Name:{
            type:Sequelize.DataTypes.STRING,
            allowNull:false,
         
        },

        image: {
            type: Sequelize.DataTypes.STRING(500), // Adjust the length as needed
            allowNull: false,
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