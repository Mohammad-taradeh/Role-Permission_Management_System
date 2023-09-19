import express from "express";
import { User } from "../db/entities/User.js";
import { authenticate } from "../middleware/auth/authenticate.js";


const router = express.Router();
router.get("/", authenticate, async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(500).send("Threr are no user with this username");
    }
  
    const user = await User.findOneBy({ username: req.body.username });
  
    if (user === null) {
      return res.status(500).send("ther are no such user");
    }
    
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong");
  }
});
export default router;
