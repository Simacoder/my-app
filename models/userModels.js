const mongoose = require("../database");

//create a schema

var userSchema = new mongoose.Schema({
    name: String,
    email: String
});

var userModel = mongoose.model('users', userSchema);

module.exports = mongoose.model("Users", userModel);