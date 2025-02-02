import express from 'express'

import {getProduct,createProduct,updatedProduct,deletedProduct} from '../controller/product_controller.js'

const router = express.Router()

// get products
router.get('/',getProduct)

// create new product
router.post('/',createProduct)

// updating product
router.put('/:id',updatedProduct);

// delete products
router.delete('/:id',deletedProduct)

export default router 