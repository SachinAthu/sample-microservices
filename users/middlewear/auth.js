const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const User = require('./../Models/Users');


module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {

      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      console.log(req.token);
        
        const decoded = jwt_decode(req.token)
        console.log(decoded.payload._id)

        if(Date.now() >= decoded.exp * 1000){
          res.status(403).json({status:"Token Expired"});
        }else{ //toke not expired
          if(decoded.payload.userType === "Customer"){
            next();
          }else{
            res.status(403).json({status:"Permission Denied"});
          }
        }
       
 
    } else {
      res.status(400).json({statuc:"Token Undifined"});
    }
};







