const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    gender: String,
    role: String,
    password: String,
    date: {
        type: Date,
        default: Date.now, 
    },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;