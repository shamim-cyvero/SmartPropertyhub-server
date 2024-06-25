import { Contact } from "../Models/contact.model.js";
import sendEmailForContact from "../Utils/SendEmail.js";

export const UserContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "all fields required",
      });
    }

    let contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });
    res.status(201).json({
      success: true,
      message: "message sent Successfully",
      contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ContactEmail = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const text = `Hi,Admin This is Contact person Details\n\n User Name : ${name}\n User Phone Number : ${phone} `;

    const SENDER_EMAIL = process.env.SMTP_SENDER_EMAIL;
    sendEmailForContact(text, SENDER_EMAIL, "Contact from Smart-Property-Hub");

    await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      message: "message sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
