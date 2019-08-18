const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        //unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function () {
                return 'Invalid email format'
            }
        },
        
    },
    phoneNumber: {
        type: String,
        //unique: true
    },
    password: {
        type: String,
    
    },
    tokens: [{
        access: {
          type: String,
        },
        token: {
          type: String,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }	
});

const User = mongoose.model('User', userSchema)

module.exports.User = User
