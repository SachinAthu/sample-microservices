const Product = require('./../Models/Products');
/**
 * Implemented for insert Product document in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with inserted Product document
 */
 exports.createProduct = async (req, res) => {
 
    try {

        const newProduct = {
            productName:req.body.productName,
            price:req.body.price,
            quantity:req.body.quantity,
            discount:req.body.discount,
            description:req.body.description,
            sellerId:req.body.sellerId
        }

            Product
            .create(newProduct)
              .then(product=>{
                  res.json(product)
              })
              .catch(err=>{
                  res.json({
                  message: err.message,
              })
            })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
};



/**
 * Implemented for get specific product document in the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with single product documents in the database
 */
 exports.getProduct = async (req, res) => {
    try {
        const result = await Product.findOne({_id:req.params.id})
        if(result)
            res.status(200).json(result)
        else
            res.status(404).json({message:'Empty'})
            
    } 
    catch (err) {
        res.status(400).json({
            error: err,
            message: 'No customer Exsists',
        });
    }
};





/**
 * Implemented for get specific product document in the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with single product documents in the database
 */
 exports.getProducts = async (req, res) => {
    try {
        const result = await Product.find()
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


