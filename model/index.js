const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

const sequelize=new Sequelize('flipkart','root','',{
    host:"localhost",
    dialect:'mysql'
})


try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db={}
  db.Sequelize=Sequelize;
  db.sequelize=sequelize;


 db.user=require('./user.model')(Sequelize,sequelize)
 db.master=require('./master.model')(Sequelize,sequelize)
 db.menu=require('./menu.model')(Sequelize, sequelize)
 db.category=require('./category.model')(Sequelize,sequelize)
 db.subcat=require('./subCat.model')(Sequelize,sequelize)
 db.product=require('./product.model')(Sequelize,sequelize)
 db.color=require('./color.model')(Sequelize,sequelize)
 db.colorimage=require('./colorimage.model.js')(Sequelize,sequelize)
 db.size=require('./size.model.js')(Sequelize,sequelize)
//  db.reviews=require('./reviews.model.js')(Sequelize,sequelize)
 

db.master.hasMany(db.menu,{foreignKey:'master_id'}); db.menu.belongsTo(db.master,{foreignKey: 'master_id'});
db.menu.hasMany(db.category,{foreignKey:'menu_id'}); db.category.belongsTo(db.menu,{foreignKey: 'menu_id'});
db.category.hasMany(db.subcat,{foreignKey:'cat_id'}); db.subcat.belongsTo(db.category,{foreignKey: 'cat_id'});
db.subcat.hasMany(db.product,{foreignKey:'subcat_id'}); db.product.belongsTo(db.subcat,{foreignKey: 'subcat_id'});
db.product.hasMany(db.color,{foreignKey:'prod_id'}); db.color.belongsTo(db.product,{foreignKey: 'prod_id'});
db.color.hasMany(db.colorimage,{foreignKey:'color_id'}); db.colorimage.belongsTo(db.color,{foreignKey: 'color_id'});
db.product.hasMany(db.size,{foreignKey:'prod_id'}); db.size.belongsTo(db.product,{foreignKey: 'prod_id'});
// db.product.hasMany(db.reviews,{foreignKey:'prod_id'});db.reviews.belongsTo(db.product,{foreignKey:'prod_id'});

module.exports=db;