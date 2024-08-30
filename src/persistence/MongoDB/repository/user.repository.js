import { userModel } from "../models/user.model.js";

const getAllUsers = async (query, options) => {
  const users = await userModel.paginate(query, options);

  return users;
};

const createUsers = async (body) => {
  const user = await userModel.create(body);
  return user;
};

const getUsersById = async (id) => {
  const user = userModel.findById(id);

  return user;
};

const getUsersByEmail = async (email) => {
  const user = userModel.findOne({ email: email });
  return user;
};

const updateUsers = async (id, data) => {
  const usersUpdate = await userModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return usersUpdate;
};

const deleteUsers = async (id) => {
  const users = await userModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return users;
};

export default {
  createUsers,
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
  getUsersByEmail,
};
