const express=  require('express');
const { getAllProducts, createProduct ,UpdateProduct, deleteproducts, getProductsDetials} = require('../constrollers/productController');
const {isAuthenticateUser ,authorisedRole} = require('../middleware/auth');

const router=express.Router();

router.route('/products').get(getAllProducts)
router.route('/products/new').post(isAuthenticateUser,authorisedRole("admin"),createProduct)
router.route('/products/:id').put(isAuthenticateUser,authorisedRole("admin"),UpdateProduct).delete(authorisedRole("admin"),deleteproducts).get(getProductsDetials)
// router.route('/products/getdetials/:id').get(getProductsDetials)


module.exports=router