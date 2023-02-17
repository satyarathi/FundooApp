import { Schema, model } from 'mongoose';
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
});



// password hashing

userSchema.pre('save', async function(next) {
    console.log("encripting");
    try {
        this.password = bcryptPassword
        const salt = await bcrypt.genSalt(12)
        const bcryptPassword = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})
export default model('User', userSchema);