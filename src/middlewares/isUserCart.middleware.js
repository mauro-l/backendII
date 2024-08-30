import { request, response } from "express";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import { verifyToken } from "../utils/jwt.js";

export const isUserCart = async (req = request, res = response, next) => {
  const { cid } = req.params;
  const userToken = cookieExtractor(req);
  if (!userToken) {
    return res.status(404).json({ status: "error", msg: "Token not found" });
  }
  const tokenVerify = verifyToken(userToken);
  if (!tokenVerify) {
    return res.status(401).json({ status: "error", msg: "Invalid Token" });
  }
  if (tokenVerify.cart._id !== cid) {
    return res.status(401).json({ status: "error", msg: "Wrong cart user" });
  }
  next();
};
