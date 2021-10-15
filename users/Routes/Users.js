const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../middlewear/auth');
const Controller = require('../Controllers/Users');


router.route('/register')
     .post(Controller.createUser);

router
    .route('/login')
    .post(Controller.loginUser);

router
    .route('/:id')
    .get(Controller.getUser);

// router
//     .get('/',checkAuth,Controller.getUsers);

router
    .route('/')
    .get(Controller.getUsers);



function verifyToken(req,res,next){
    // const bearerHeader = req.headers["authorization"];
    // if (typeof bearerHeader !== "undefined") {
    //   const bearer = bearerHeader.split(" ");
    //   const bearerToken = bearer[1];
    //   req.token = bearerToken;
    //   next();
    // } else {
    //   res.status(403).json({statuc:"Token Expired"});
    // }


    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err){
                console.log(err)
            }else{
                console.log('called')
                //req.userData = decoded;
                //console.log(req.userData)
                next();
            }
        });
    
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

}






module.exports = router;