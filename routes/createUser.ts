import express from "express";
import { validateUser } from "../middleware/user.js";
import { validateProfile } from "../middleware/profile.js";
import { User } from "../db/entities/User.js";
import { Profile } from "../db/entities/Profile.js";
import { Role } from "../db/entities/Role.js";

const router = express.Router();

router.post("/", validateUser, validateProfile, (req, res) => {
  try {
    const user = new User();
    
    user.username = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;

    const profile = new Profile();
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    profile.dateOfBirth = req.body.dateOfBirth;
    profile.save();
    
    user.profile = profile;
    
    user.save();
    res.status(201).send("User has been added succefully");
  } catch (err) {
    res.status(500).send("something went wrong");
    console.error(err);
  }
});
export default router;
