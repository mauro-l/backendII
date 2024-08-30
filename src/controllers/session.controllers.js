import { formatUserCartDTO } from "../dto/resUser.dto.js";
import userRepository from "../persistence/MongoDB/repository/user.repository.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "ok", msg: "User Created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const token = createToken(req.user);
    res.cookie("token", token, { httpOnly: true });
    const user = formatUserCartDTO(req);

    res.status(200).json({ status: "ok", payload: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.getUsersByEmail(email);
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
};

const googleAuth = async (req, res) => {
  try {
    res.status(200).json({ status: "ok", payload: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const current = async (req, res) => {
  const user = formatUserCartDTO(req);
  res.status(200).json({ status: "ok", user: user });
};

export default {
  register,
  login,
  googleAuth,
  current,
  loginAuth,
};
