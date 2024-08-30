import express from "express";
import cors from "cors";
import __dirname from "./__dirname.js";
import router from "./src/router/index.routes.js";
import { connectMongoDB } from "./src/config/mongoDB.config.js";
import session from "express-session";
import env from "./src/config/env.config.js";
import passport from "passport";
import { initializePassport } from "./src/config/passport.config.js";
import cookieParser from "cookie-parser";

const PORT = env.PORT;
const app = express();
app.use(cors());

//BBDD
connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//rutas de la api
app.use("/api", router);

const httpServer = app.listen(PORT, () =>
  console.log(`Server corriendo en⚡http://localhost:${PORT}`)
);
