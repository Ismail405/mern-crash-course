import Product from "../models/product_model.js";
import mongoose from "mongoose";

export const getProduct = async (req,res)=>{
  try {
    const products = await Product.find({})
    res.status(200).json({success:true,data:products})
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const createProduct = async (req,res)=>{
  const product = req.body //user will send this data
  if(!product.name || !product.price || !product.image){
    return res.status(400).json({success:false, message:'Please provide all fields'})
  }
  const newProduct = new Product(product)
  try {
    await newProduct.save()
    res.status(201).json({success:true,data:newProduct})
  } catch (error) {
    console.log(`Error in create product: ${error.message}`);
    res.status(500).json({success:false,message:'Server error'})
  }
}

export const updatedProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }
  try {
    // Find and update product
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }   
    res.status(200).json({ success: true,message:"Product updated successfully" ,data: updatedProduct });
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

export const deletedProduct = async(req,res)=>{
  const {id} = req.params
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({success:true,message:'Product deleted'})
  } catch (error) {    
    res.status(500).json({success:false,message:'Server Error'})
  }
}