import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { Profile } from "./entities/Profile.js";
const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "authorization",
  entities: [User, Profile, Role, Permission ],
  synchronize: true
});


export default dataSource;
