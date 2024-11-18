import userModel from "../models/userModel";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

//route to handle "forgot password" request
const forgotPassword = async(req,res)=>{
    const {email} = req.body

    //check if email exists
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }

    //generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    await user.save()

    //send email with reset token
    //const resetUrl = edit when app is live  `https://todo-app-b96a5.web.app/resetPassword?token=${resetToken}`;
    var transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
            from: 'abc12369699@gmail.com',
            to: email,
            subject: "Reset Password",
            html: `<h1>Reset password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
        };
    
    await transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log("Email sent: "+ info.response)
        }
    });
    res.status(200).json({message: "A link to reset your password has been sent to your email."});
}

// route to handle password reset request
const resetPassword = async (req,res)=>{
    const {token,password} = req.body;

    //verify reset token
    console.log("token: ", token);
    const user = await userModel.findOne({resetToken: token})
    if(!user){
        return res.status(400).json({message: 'Invalid token'});
    }
    
    //update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();

    res.status(200).json({message: "Password reset successfull."})
}

export {forgotPassword, resetPassword}