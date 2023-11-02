import mongoose from "mongoose";

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
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiration: {
        type: Date,
    },
    blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]
})


export default mongoose.model("User", userSchema);
// users