const Products = require("../module/productModule")
const ApiFeature=require('../utils/apifeature')
//Creating Products

const createProduct = async (req, res,next) => {
    try {
        console.log(req.body)
        req.body.user=req.user.id;
        // Create a new product using the data from the request body
        const product = await Products.create(req.body);
        // Send a success response with the created product
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Extract error messages from the validation error
            const errors = Object.values(error.errors).map(err => err.message);
            // Send a 400 Bad Request response with the validation errors
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        } else {
            // For other types of errors, send a 500 Internal Server Error response
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};


const getAllProducts = async (req, res,next) => {
   try {
    const resultPage=5;
    const productCount= await Products.countDocuments()
    const apiFeature=new ApiFeature(Products.find(),req.query).search().filter().pagination(resultPage)
    const product = await apiFeature.query;

    res.status(201).json({
        sucess: true,
        product,
        productCount
    })
   } catch (error) {

    res.send(error)
    
   }
}

//updating products -- admin
const UpdateProduct = async (req, res, next) => {
    try {
        let product = Products.findById(req.params.id);
    console.log(product)
    if (!product) {
        return res.status(500).json(
            {
                sucess: false,
                message: "Product not find"
            }
        )
    }

    product = await Products.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({
        sucess:true,
        product
    })
    } catch (error) {
        res.status(500).send(error)
        
    }


}

//product detials
const getProductsDetials= async (req,res,next)=>{
    try {
        const product = await Products.findById(req.params.id);

        if (!product) {
            // If no product found with the given ID, return 404 Not Found
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        
    }
}

//delete products 
const deleteproducts= async(req,res,next)=>{
    try {
        const productId = req.params.id;
        // Use findByIdAndDelete to find the product by its ID and delete it
        const deletedProduct = await Products.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            // If no product found with the given ID, return 404 Not Found
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // If the product is deleted successfully, send success response
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle any error that might occur during the deletion process
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }





}

module.exports={deleteproducts,getProductsDetials,UpdateProduct,getAllProducts,createProduct}