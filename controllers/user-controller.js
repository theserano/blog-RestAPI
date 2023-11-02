import User from "../models/User";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if(!users){
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users})
}

export const signup = async (req, res, next) => {
    const {fName, lName, phoneNumber, email, password} = req.body;
    console.log(req.body);

    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message: "user already exist"});
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        firstName: fName,
        lastName: lName,
        phone: phoneNumber,
        email: email,
        password: hashPassword,
        blogs: []
    });
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    console.log(user);
    return res.status(201).json({user})
}


export const login = async (req, res, next) => {
    const {email, password} = req.body;
    // console.log(req.body);
    let existingUser;

    try {
        existingUser = await User.findOne({email: email})
        if(!existingUser){
            return res.status(404).json({message: "couldn't find user"});
        }
    } catch (error) {
        return console.log(error);
    } 
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if(!isPasswordCorrect){
        res.status(400).json({message: "incorrect message"})
        console.log("incorrect password");
    }else{
        return res.status(200).json({message: "login successful"});
    }
}

