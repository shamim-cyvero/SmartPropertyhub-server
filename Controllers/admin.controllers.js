import jwt from "jsonwebtoken";
import { Admin } from "../Models/admin.model.js";
import bcrypt from "bcrypt";

export const AdminSignUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    let admin = await Admin.find({ email });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "admin Already Exist Please! Login",
      });
    }

    const hasPassword = await bcrypt.hash(password, 10);
    admin = await Admin.create({ name, email, password: hasPassword, phone });

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Registration Success",
        admin,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}; 

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    let admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email and Password ",
      });
    }

    const adminVerification = await bcrypt.compare(password, admin.password);
    if (!adminVerification) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email and Password ",
      });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Login Success",
        admin,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AdminLogout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logout Success",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


