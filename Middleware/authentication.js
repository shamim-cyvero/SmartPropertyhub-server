import jwt from "jsonwebtoken";
import { Admin } from "../Models/admin.model.js";

const Authentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "token has been Expired",
    });
  }

  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  req.admin = await Admin.findById(decodeToken._id);
  next();
};

export default Authentication;
