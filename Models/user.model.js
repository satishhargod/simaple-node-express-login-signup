const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: {
          type: String,
          generated: true,
          trim: true,
        },
        first_name: {
          type: String,
          default: null,
          trim: true,
        },
        last_name: {
          type: String,
          default: null,
          trim: true,
        },
        mobile_number: {
          type: String,
          default: null,
          lowercase: true,
          trim: true,
        },
        email: {
          type: String,
          default: null,
          trim: true,
          lowercase: true,
        },
        password: {
          type: String,
          default: null,
          trim: true,
          minlength: 6,
          private: true, // used by the toJSON plugin
        },
        city: {
          type: String,
          trim: true,
          default: null,
        },
        state: {
          type: String,
          trim: true,
          default: null,
        },
        status: {
          type: Boolean,
          trim: true,
          default: true,
        }       
      },
      {
        //timestamps: true,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
      });

const User = mongoose.model('user', UserSchema);
module.exports = User;