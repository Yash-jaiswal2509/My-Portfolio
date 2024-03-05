import { NextFunction } from "express"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserType } from "../shared/types";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwrod: { type: String, required: [true, "Password is required"] },
        confirmPassword: { type: String, required: true },
        refreshToken: { type: String }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (this.isModified("passwrod")) {
        this.passwrod = await bcrypt.hash(this.passwrod, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJwt = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        password: this.password,
        firstName: this.firstName,
    },
        process.env.JWT_SECRET_KEY as string,

        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_KEY as string,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model<UserType>("User", userSchema);