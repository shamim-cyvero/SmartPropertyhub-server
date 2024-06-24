import express from "express";
import {
 
  CreatePost,
  DeletePost,
  GetAllPost,
  SearchPost,
  UpdatePost,
} from "../Controllers/post.controllers.js";
import Authentication from "../Middleware/authentication.js"; 

const route = express.Router();

route.route("/getallpost").get(GetAllPost);
route.route("/search/:key").get(SearchPost);
 
route.route("/create").post( CreatePost);
route.route("/delete/:id").delete(Authentication, DeletePost);
route.route("/update/:id").put(Authentication, UpdatePost);



export default route;
