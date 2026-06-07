import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { AsyncHandler } from "../../utils/AsyncHandler.js";

import { User } from "../../model/user.model.js";
import { Cart } from "../../model/cart.model.js";
import { Role } from "../../model/role.model.js";
import { Product } from "../../model/product.model.js";
import { roles } from "../../utils/constants.js";

// add to cart
const addCart = AsyncHandler(async (req, res) => {
    const userid = req.user._id
    const role = req.role
    const { productid } = req.params
    const userRole = await Role.findOne({userid: userid, role = roles.customer})
    if(!userRole){
        throw new ApiError(404, "user not found")
    }

    const existingProduct = await Cart.findOne({userid: userid, product: productid})
    if(existingProduct){
        existingProduct.count = existingProduct.count + 1
        await existingProduct.save({validateBeforeSave: false})
    } else{
        const cartProduct = await Cart.create({
            userid: userid,
            product: productid
        })
        if(!cartProduct){
            throw new ApiError(402, "adding to cart failed")
        }
    }

    const allCart = await Cart.find({userid: userid}).populate({
        path: "product",
        match: {
            visibility: true
            
        }
    })

    if(!allCart){
        throw new ApiError(404, "user does not have anything in the cart")
    }

    return res.status(200).json(new ApiResponse(200, "adding to cart successful", allCart))

});

// get cart
const fetchCart = AsyncHandler(async (req, res) => {
    const userid = req.user._id
    const role = req.role

    const userRole = await Role.findOne({userid: userid, role = roles.customer})
    if(!userRole){
        throw new ApiError(404, "user not found")
    }

    const allCart = await Cart.find({userid: userid}).populate({
        path: "product",
        match: {
            visibility: true
            
        }
    })

    if(!allCart){
        throw new ApiError(404, "user does not have anything in the cart")
    }

    return res.status(200).json(new ApiResponse(200, "adding to cart successful", allCart))
});

// remove from cart
const removeCart = AsyncHandler(async (req, res) => {

    const userid = req.user._id
    const role = req.role
    const {productid} = req.params

    const userRole = await Role.findOne({userid: userid, role: roles.customer})
    if(!userRole){
        throw new ApiError(404, "user not found")
    }

    const removeProduct = await Cart.findOneAndDelete({userid: userid, product: productid})
    if(!removeProduct){
        throw new ApiError(402, "removing product from cart failed")
    }

    const allCart = await Cart.find({userid: userid}).populate({
        path: "product",
        match:{
            visibility: true
        }
    })
    if(!allCart){
        throw new ApiError(404, "user has nothing in the cart")
    }
    return res.status(200).json(new ApiResponse(200, "removing product from cart successful", allCart))

});

export { addCart, fetchCart, removeCart };
