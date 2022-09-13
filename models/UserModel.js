const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },

})

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        if (user.status != "Active") {
            throw Error("Pending Account. Please Verify Your Email!")
        }
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        else {
            throw Error("incorrect password");
        }

    }
    throw Error("incorrect email")
}

module.exports = mongoose.model("Users", userSchema);