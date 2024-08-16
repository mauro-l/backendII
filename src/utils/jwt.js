import jwt from "jsonwebtoken";
import env from "../config/env.config.js";

export const createToken = (user) => {
  const { _id, email } = user;
  const token = jwt.sign({ _id, email }, env.JWT_SECRET_CODE, {
    expiresIn: "2m",
  });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET_CODE);
    return decoded;
  } catch (err) {
    return null;
  }
};
