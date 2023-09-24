import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../db/entities/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const username = req.body.userName;
    const password = req.body.password;
    const user = await User.findOneBy({
      username,
    });
  

    const matching = await bcrypt.compare(password, user?.password || "");

    if (user && matching) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          displey_name: user.profile.firstName + " " + user.profile.lastName,
        },
        process.env.KEY || "",
        {
          expiresIn: "2w",
          allowInsecureKeySizes: true,
          algorithm: "HS512",
        }
      );

      res.send(token);
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});



export default router;
