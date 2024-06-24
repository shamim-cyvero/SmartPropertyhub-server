import express from "express";
import { ContactEmail, UserContact } from "../Controllers/contact.controllers.js";

const route = express.Router();

route.route("/contact").post(UserContact);
route.route("/contact/email").post(ContactEmail);

export default route;
