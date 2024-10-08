const jwt = require('jsonwebtoken');
module.exports={
    checkToken:(req,res,next)=>{
        let token=req.headers.token;
        if(token){
            
            jwt.verify(token,process.env.SECRET,(err,decoded)=>{
              if(err){
                res.send({error:true,message:"Unauthorized Access"});
              }else{
                  req.user=decoded;
                  next();
              }
            })
        }else{
            res.send({error:true,message:"Token not provided"})
        }
    }
}