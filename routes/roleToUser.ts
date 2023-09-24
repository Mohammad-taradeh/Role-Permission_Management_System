import express from "express";
import { Role } from "../db/entities/Role.js";
import { User } from "../db/entities/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.user) {
    return res.status(500).send("Enter thr User name");
  }

  if (!req.body.roleName) {
    return res.status(500).send("Enter thr role name for that user");
  }

  try {
    const role = await Role.findOneBy({ roleName: req.body.roleName });
    const user = await User.findOneBy({ username: req.body.user });

    if (role === null) {
      return res.send("No such role");
    }
    
    if (user === null) {
      return res.send("No such user");
    }

    
    //help me?
    user.roles = user.roles ?? [];
    const x = user.roles.filter((e) => e.roleName === role.roleName);
    if (x.length>0) {
      return res.status(500).send("this user already has this role");
    } else {
      user.roles = [...user.roles, role];
    }

    await user.save();

    res
      .status(200)
      .send(`Role has been added to the user name: ${user.username}`);
  } catch (error) {

    console.error(error);
    res.status(500).send("something went wrong");
  }
});
export default router;
