const mongoose = require('mongoose');
const SignupData=new mongoose.Schema({
    name: {
        type: String,
        ref: 'User',
        
    },
    dob: {
        type: String,
        Ref: 'QnPaper',
        
    },
    email: {
        type: String,
       
    },
    mobile: {
        type: String,
        
    },
    pin: {
        type: String,
       
    },
    pass: {
        type: String,
        
    }
}, { timestamps: true })
module.exports = mongoose.model("Sign", SignupData);