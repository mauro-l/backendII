import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
  },
});

export const userModel = mongoose.model(userCollection, userSchema);
