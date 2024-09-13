import { Router } from "express";
import passport from "passport";
import {
  passportCall,
  usePassportStrategy,
} from "../middlewares/passport.middleware.js";
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

router.post(
  "/register",
  usePassportStrategy("register"),
  sessionControllers.register
);

//Estrategia local mediante passport
router.post("/login", passportCall("login"), sessionControllers.login);

//Inicio de session con token sin passport
router.post("/auth", sessionControllers.loginAuth);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  sessionControllers.googleAuth
);

router.get("/current", passportCall("jwt"), sessionControllers.current);

export default router;
