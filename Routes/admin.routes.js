import express from "express";
import {
  AdminLogin,
  AdminLogout,
  AdminSignUp,
} from "../Controllers/admin.controllers.js";
import Authentication from "../Middleware/authentication.js"; 

const route = express.Router();

route.route("/signup").post(AdminSignUp);
route.route("/login").post(AdminLogin);
route.route("/logout").get(Authentication, AdminLogout);

export default route;
