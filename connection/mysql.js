const mysql=require('mysql');

const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD
  
})

connection.connect((err)=>{

    err?console.log(err.message):console.log("connected");
})

module.exports=connection;



