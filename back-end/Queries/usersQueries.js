const { db } = require("../db/dbConfig.js");

const getAllUsers = async () => {
  const query = "SELECT id, profileimg, username, theme FROM users";
  const users = await db.any(query);
  return users;
};

const getUserByID = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const user = await db.oneOrNone(query, id);
  return user;
};

const createUser = async (user) => {
  const query =
    "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
  const newUser = await db.oneOrNone(query, [
    user.username,
    user.password,
    user.email,
  ]);
  return newUser;
};

const updateUser = async (id, user) => {
  const query =
    "UPDATE users SET profileimg = $1, username = $2, password = $3, email = $4, theme = $5 WHERE id = $6 RETURNING *";
  const updateUser = await db.oneOrNone(query, [
    user.profileimg,
    user.username,
    user.password,
    user.email,
    user.theme,
    id,
  ]);
  return updateUser;
};

const deleteUser = async (id) => {
  if (id === null || id === undefined) {
    return false;
  }

  const query = "DELETE FROM users WHERE id = $1 RETURNING *";
  const deletedUser = await db.oneOrNone(query, id);
  return deletedUser;
};

const checkIfUserExists = async (userData) => {
  const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const user = await db.oneOrNone(query, [userData.email, userData.password]);

  if (!user) {
    return null;
  }

  return user;
};

const checkIfUserExistsByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const user = await db.oneOrNone(query, email);

  if (!user) {
    return null;
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  checkIfUserExists,
  checkIfUserExistsByEmail,
};
