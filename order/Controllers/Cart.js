const axios= require('axios');
const Cart = require('./../Models/Cart');

/**
 * Implemented for insert Cart document in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with inserted Cart document
 */
 exports.createCart = async (req, res) => {
    try {
        console.log(req.body);

        const newCart = {
            productId:req.body.productId,
            customerId:req.body.customerId
        }

        //product
        axios
        .get('http://product-cluster-ip:4000/' + req.body.productId)
        .then(()=>{

                //customer
                axios
                .get('http://users-cluster-ip:5000/' + req.body.customerId)
                .then(()=>{
                   
                        Cart
                        .create(newCart)
                          .then(cart=>{
                              res.json(cart)
                          })
                          .catch(err=>{
                              res.json({
                              message: err.message,
                          })
                        })
                })
                .catch((err)=>{ //customer
                    console.log('Empty Customer')
                    res.status(400).json({
                        status: 'failed',
                        message: 'Invalid Customer Id',
                    });
                })

        })
        .catch((err)=>{ //prodcut
            console.log('Empty Product')
            res.status(400).json({
                status: 'failed',
                message: 'Invalid Product Id',
            });
        })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }

};


/**
 * Implemented for insert Cart document in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with inserted Cart document
**/
 exports.getCart = async (req, res) => {
    let cartList =[];
    let cartItem ={};
    let productItem ={};
    let sellerInfo ={}
    let cartRes = null

    try {
        cartRes = await Cart.find({customerId:req.params.customerId})
    }catch(err) {
        console.log(`Getting cart details for customer ${req.params.customerId} failed!\n`, err)
    }

    if(!cartRes || cartRes.length === 0)  res.status(200).json({message: "No cart object found"});

    for(let i = 0;i < cartRes.length ; i++){
        let productRes = null
        let sellerRes = null

        //get product
        try {
            productRes = await axios.get('http://product-cluster-ip:4000/' + cartRes[i].productId)
        }catch(err) {
            console.log(`Getting product ${cartRes[i].productId} failed!\n`, err)
        }

        if(!productRes) continue

        try {
            sellerRes = await axios.get('http://users-cluster-ip:5000/'+ productRes.data.sellerId)
            if(!sellerRes) continue
            sellerInfo ={
                sellerId:productRes.data.sellerId,
                sellerName:sellerRes.data.firstName+ ' '+sellerRes.data.lastName,
                email:sellerRes.data.email,
                mobile:sellerRes.data.mobile
            }
            productItem = {
                productId:cartRes[i].productId,
                productName:productRes.data.productName,
                price:productRes.data.price                  
            }
            cartItem = {
                cartId:cartRes[i]._id,
                productInfo:productItem,
                seller:sellerInfo
            }
            // console.log(cartItem)
            cartList.push(cartItem)
        }catch(err) {
            console.log(`Getting seller ${productRes.data.sellerId} failed!\n`, err)
        }
    }

    setTimeout(()=>{
        res.status(200).json(cartList)
    },1000)

 }

