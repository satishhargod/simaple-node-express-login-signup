const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../Models/user.model');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const userexist = await User.findOne({email:req.body.email});
      if(userexist){
        let errorresponse = {
            status:401,
            error:true,
            success:false,
            message:"Email already exist",
            data:[]
          }
          res.send(errorresponse); 
      }
      const user = new User(req.body);
      const result = await user.save();
      const response = {
        status:200,
        error:false,
        success:true,
        message:"register success",
        data:result
      }
      res.send(response);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
        let {username, password} = req.body;
        if(!username){
            const response = {
                status:401,
                error:true,
                success:false,
                message:"email or mobile_number is requerd",
                data:[]
              }
            res.send(response);
        }
        const userdetails = await User.findOne({$or: [{mobile_number: req.body.username, password:req.body.password}, {email: req.body.username, password:req.body.password}]});
            
        if(userdetails){
            const response = {
                status:200,
                error:false,
                success:true,
                message:"login success",
                data:userdetails
                }
            res.send(response);
        }
        else{
            const response = {
                status:401,
                error:true,
                success:false,
                message:"username or password not match",
                data:[]
                }
            res.send(response);
        }
      
      
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

//   findProductById: async (req, res, next) => {
//     const id = req.params.id;
//     try {
//       const product = await Product.findById(id);
//       // const product = await Product.findOne({ _id: id });
//       if (!product) {
//         throw createError(404, 'Product does not exist.');
//       }
//       res.send(product);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         next(createError(400, 'Invalid Product id'));
//         return;
//       }
//       next(error);
//     }
//   },

//   updateAProduct: async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const updates = req.body;
//       const options = { new: true };

//       const result = await Product.findByIdAndUpdate(id, updates, options);
//       if (!result) {
//         throw createError(404, 'Product does not exist');
//       }
//       res.send(result);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         return next(createError(400, 'Invalid Product Id'));
//       }

//       next(error);
//     }
//   },

//   deleteAProduct: async (req, res, next) => {
//     const id = req.params.id;
//     try {
//       const result = await Product.findByIdAndDelete(id);
//       // console.log(result);
//       if (!result) {
//         throw createError(404, 'Product does not exist.');
//       }
//       res.send(result);
//     } catch (error) {
//       console.log(error.message);
//       if (error instanceof mongoose.CastError) {
//         next(createError(400, 'Invalid Product id'));
//         return;
//       }
//       next(error);
//     }
//   }
};
