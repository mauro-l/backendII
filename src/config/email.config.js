import nodemailer from "nodemailer";
import envConfig from "../config/env.config.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: envConfig.GMAIL_MAIL,
    pass: envConfig.GMAIL_PASS,
  },
});
