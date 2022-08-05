const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
        // required: true
    },
    registrationTime: {
        type: Date,
        default: Date.now
    },
    statusUser: {
        type: String,
        ref: 'Role'
    }
});



// userSchema.remove({'_id':{'$in':["62ea2b91f436d15f32744bd2", "62ea2ba8f436d15f32744bd6"]}})


const users = new mongoose.model("users",userSchema);


module.exports = users;