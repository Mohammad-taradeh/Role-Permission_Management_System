import express from "express";
import { User } from "../db/entities/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const validateLogin = async (username: string, password: string) => {
  try {
    const user = await User.findOneBy({
      username,
    });

    const matching = await bcrypt.compare(password, user?.password || "");

    if (user && matching) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
        },
        process.env.KEY || "",
        {
          expiresIn: "2w",
          allowInsecureKeySizes: true,
          algorithm: "HS512",
        }
      );

      return token;
    } else {
      throw "Invalid Credentials";
    }
  } catch (error) {
    throw "Invalid Credentials!!!";
  }
};

export default validateLogin;
