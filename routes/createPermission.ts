import express from "express";
import { Permission } from "../db/entities/Permission.js";
import { Like } from "typeorm";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.permissionName) {
      res.status(500).send("Enter the name of the permission!");
    }

    const x = await Permission.findOneBy({
      permissionName: req.body.permissionName 
    });

    if (x === null) {
      let permission = new Permission();
      permission.permissionName = req.body.permissionName;

      permission.save();
      res.status(201).send("Permission has been added succefully!");
    } else {
      res.send("There ara a Permission with this name!");
    }
  } catch (error) {
    res.status(500).send("Something wrong happened!");
    console.error(error)
  }
});

export default router;
