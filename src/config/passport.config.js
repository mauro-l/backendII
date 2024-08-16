import passport from "passport";
import google from "passport-google-oauth20";
import jwt, { ExtractJwt } from "passport-jwt";
import local from "passport-local";
import userDao from "../dao/MongoDB/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import env from "./env.config.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

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
          const { first_name, last_name, age } = req.body;
          const user = await userDao.getUsersByEmail(username);
          if (user) {
            return done(null, false, { message: "User already exists " });
          }
          const newUser = {
            first_name,
            last_name,
            password: createHash(password),
            email: username,
            age,
          };

          const userCreate = await userDao.createUsers(newUser);
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
          const user = await userDao.getUsersByEmail(username);
          if (!user || !isValidPassword(user.password, password)) {
            return done(null, false);
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
          const user = await userDao.getUsersByEmail(emails[0].value);
          if (user) {
            return cb(null, user);
          } else {
            const newUser = {
              first_name: name.givenName,
              last_name: name.familyName,
              email: emails[0].value,
            };
            const userCreated = await userDao.createUsers(newUser);
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
      const user = await userDao.getUsersById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
