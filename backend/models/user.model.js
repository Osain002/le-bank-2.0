const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },

    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength:8, 
    },
    
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },

    lastname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },

    accounts: [
        {
            accType: {
                type: String
            },
            balance: {
                type: Number,
                required: true
            },
            sortcode: {
                type: Number,
                required: true,
                length: 6,
                unique: false
            },

            accNum: {
                required: true,
                type: Number,
                unique: true,
                length: 9
            },

            cardNum: {
                type: Number,
                unique: true,
                length: 16
            },

            CV2: {
                type: Number, 
                length: 3
            },

            statement: [
                {
                    required: false,
                    
                    transactionType: {
                        type: String,
                        required: true,
                    },
                    amount: {
                        type: Number,
                        requirec: true,
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    Ref: {
                        type: String,
                        required: true
                    },
                    Date: {
                        type: String
                    }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;


