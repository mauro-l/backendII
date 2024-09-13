import passport from "passport";
import google from "passport-google-oauth20";
import local from "passport-local";
import env from "./env.config.js";
import jwt, { ExtractJwt } from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import userRepository from "../persistence/MongoDB/repository/user.repository.js";
import cartRepository from "../persistence/MongoDB/repository/cart.repository.js";
import { validateBirthdate } from "../utils/validateBirthdate.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;

export const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, birthdate, role, phone } = req.body;
          const user = await userRepository.getUsersByEmail(username);
          if (user) {
            return done(null, false, { message: "User already exists " });
          }
          if (!validateBirthdate(new Date(birthdate))) {
            return res.status(400).json({
              message: "The date of birth is invalid.",
            });
          }
          const cart = await cartRepository.createCarts();
          const newUser = {
            first_name,
            last_name,
            password: createHash(password),
            email: username,
            birthdate,
            phone,
            role,
            cart: cart._id,
          };

          const userCreate = await userRepository.createUsers(newUser);
          return done(null, userCreate);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userRepository.getUsersByEmail(username);
          if (!user || !isValidPassword(user.password, password)) {
            return done(null, false, { message: "User or email invalid" });
          }

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  //Estrategia de google

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${env.PORT}/api/session/google`,
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const { name, emails } = profile;
          const user = await userRepository.getUsersByEmail(emails[0].value);
          if (user) {
            return cb(null, user);
          } else {
            const newUser = {
              first_name: name.givenName,
              last_name: name.familyName,
              email: emails[0].value,
            };
            const userCreated = await userRepository.createUsers(newUser);
            return cb(null, userCreated);
          }
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

  //Estrategia JWT

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: env.JWT_SECRET_CODE,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //Serializacion y deserializacion
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userRepository.getUsersById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
