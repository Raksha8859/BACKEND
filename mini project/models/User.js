const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwor: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("User", userSchema);