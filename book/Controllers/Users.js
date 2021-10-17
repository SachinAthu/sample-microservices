const User = require('./../Models/Users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Implemented for insert User document in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with inserted User document
 */
exports.createUser = async (req, res) => {

    try {

        const newUser = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            userType:req.body.userType,
            mobile:req.body.mobile
        }

        User
        .findOne({email:req.body.email})
        .then(user=>{
            if(!user){

                bcrypt.hash(req.body.password,10,(err,hash)=>{
                   newUser.password = hash;

                   User
                    .create(newUser)
                    .then(user=>{
                        res.json(user)
                    })
                    .catch(err=>{
                        res.json({
                            message: err.message,
                        })
                    })
                })
            }
            else{
                res.status(403).json({
                    message:'User already registered'
                })
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
};



/**
 * Implemented for login User from the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with Logged User document
 */
 exports.loginUser = async(req,res)=>{

    try{
        User
        .findOne({email:req.body.email})
        .then(user =>{        
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){

                    let payload = {
                        _id : user.id,
                        userType:user.userType
                    }

                    jwt.sign(
                        {payload},
                        "secretKey",
                        {expiresIn : "100s"},
                        (err,token)=>{
                            res.json({
                                token:token
                            })
                        }                     
                    )
                }
                else{ // Invalid Password
                    res.status(400).json({
                        message:'Entered password is incorrect'
                    })
                }

            } // Invalid user email
            else{
                res.status(404).json({
                     message: "User does ot exist in the system" 
                });
            }
        })

    }catch(err){
        res.status(500).json({
            message: err 
       });
    }

}




/**
 * Implemented for get specific user document in the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with single user documents in the database
 */
 exports.getUser = async (req, res) => {
    try {
        const result = await User.findOne({_id:req.params.id})
        if(result)
            res.status(200).json(result)
        else
            res.status(404).json({message:'Empty'})           
    } 
    catch (err) {
        res.status(400).json({
            error: err,
            message: 'No User Exsists',
        });
    }
};






/**
 * Implemented for get specific user document in the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with single user documents in the database
 */
 exports.getUsers = async (req, res) => {
    console.log('called');
    try {
                
                const result = await User.find()
                if(result)
                    res.status(200).json(result)
                else
                    res.status(404).json({message:'Empty'})  
          
    } 
    catch (err) {
        res.status(400).json({
            error: err,
            message: 'Server Error',
        });
    }
};