import express from "express";
import { Like, In } from "typeorm";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { log } from "console";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const permissions = req.body.permissions;

    if (!req.body.roleName) {
      res.status(500).send("Enter the name of the Role!");
    }

    if (!permissions) {
      res.status(500).send("Enter the permissions of this role");
    }

    const x = await Role.findOne({
      where: { roleName: Like(`${req.body.roleName}`) },
    });

    if (x === null) {
      let role = new Role();
      role.roleName = req.body.roleName;
      let perm: Permission[] = [];

      for (let i = 0; i < permissions.length; i++) {
        let p = await Permission.findOneBy({
          permissionName: permissions[i],
        });

        if (p === null) {
          //create that permission
          var permision = new Permission();
          permision.permissionName = permissions[i];
          await permision.save();

          perm = [...perm, permision];
          continue;
        }

        perm = [...perm, p];
      }
      role.permissions = perm;
      role.save();
      res.status(201).send("Role has been added succefully!");
    } else {
      res.send("There are a Role with this name!");
    }
  } catch (error) {
    res.status(500).send("Something wrong happened!");
    console.error(error);
  }
});
export default router;
