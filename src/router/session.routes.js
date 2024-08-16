import { Router } from "express";
import userDao from "../dao/MongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    res.status(200).json({ status: "ok", payload: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getUsersByEmail(email);
    if (!user || !isValidPassword(user.password, password)) {
      return res
        .status(401)
        .json({ status: "error", msg: "Invalid credentials" });
    }

    const token = createToken(user);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ status: "ok", payload: { user, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  async (req, res) => {
    try {
      res.status(200).json({ status: "ok", payload: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
);

router.get("/current", passportCall("jwt"), async (req, res) => {
  res.status(200).json({ status: "ok", user: req.user });
});

export default router;
