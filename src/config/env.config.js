import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

export default {
  MONGO_URL: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`,
  SECRET_CODE: process.env.SECRET_CODE,
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET_CODE: process.env.JWT_SECRET_CODE,
};
