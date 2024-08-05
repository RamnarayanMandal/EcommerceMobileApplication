const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    address: [
        {
            name: {
                type: String,
                required: true,
            },
            mobileNo: {
                type: String,
                required: true,
            },
            houseNumber: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
