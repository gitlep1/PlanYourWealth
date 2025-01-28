const express = require("express");
const accounts = express.Router();
const jwt = require("jsonwebtoken");

const { getUserByID } = require("../Queries/usersQueries");

const {
  checkUserValues,
  checkUserExtraEntries,
} = require("../Validation/entryValidation");
const { requireAuth } = require("../Validation/requireAuth");
const { scopeAuth } = require("../Validation/scopeAuth");

accounts.get("/", requireAuth(), scopeAuth(["read:user"]), async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log("=== GET Users ", { users }, "===");

    res.status(200).json({ payload: users });
  } catch (err) {
    console.error("500 Error during users get:", err);
    res.status(500).json({ error: err.message });
  }
});

accounts.get(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      console.log("=== GET User by ID", { getUser }, "===");

      res.status(200).json({ payload: getUser });
    } catch (err) {
      console.error("500 Error during user get ID:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

accounts.post(
  "/signup",
  checkUserValues,
  checkUserExtraEntries,
  async (req, res) => {
    try {
      const newUserData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      };

      const userExists = await checkIfUserExists(
        newUserData.email,
        newUserData.password
      );
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = await createUser(newUserData);
      const userDataForClient = {
        theme: newUser.theme,
        email: newUser.email,
        username: newUser.username,
        profileimg: newUser.profileimg,
        last_online: newUser.last_online,
      };

      const clientTokenPayload = {
        user: newUser,
        scopes: ["read:user", "write:user"],
      };
      console.log(
        "=== POST User (signup) (clientTokenPayload)",
        { clientTokenPayload },
        "==="
      );
      const token = jwt.sign(clientTokenPayload, JWTS, {
        expiresIn: "30d",
      });

      res.status(200).json({ payload: userDataForClient, token });
    } catch (err) {
      console.error("500 Error during user post:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

users.post("/signin", async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    const checkUser = await checkIfUserExists(userData);
    if (checkUser) {
      const userDataForClient = {
        theme: checkUser.theme || null,
        email: checkUser.email,
        username: checkUser.username,
        profileimg: checkUser.profileimg || null,
        last_online: checkUser.last_online,
      };

      const clientTokenPayload = {
        user: checkUser,
        scopes: ["read:user", "write:user"],
      };
      const token = jwt.sign(clientTokenPayload, JWTS, {
        expiresIn: "30d",
      });
      console.log(
        "=== POST User (signin) (clientTokenPayload)",
        { clientTokenPayload, token },
        "==="
      );

      res.status(200).json({ payload: userDataForClient, token });
    } else {
      return res
        .status(400)
        .json({ error: "No users with these credentials found" });
    }
  } catch (err) {
    console.error("500 Error during users (signin) get:", err);
    res.status(500).json({ error: err.message });
  }
});

users.put(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const { profileimg, email, username, password, theme } = req.body;

      const oldUserData = await getUserByID(decoded.user.id);

      const newUserData = {
        profileimg: profileimg !== "" ? profileimg : oldUserData.profileimg,
        email: email !== "" ? email : oldUserData.email,
        username: username !== "" ? username : oldUserData.username,
        password: password !== "" ? password : oldUserData.password,
        theme: theme !== "" ? theme : oldUserData.theme,
        last_online: new Date().toISOString(),
      };

      const updatedUser = await updateUser(decoded.user.id, newUserData);
      console.log("=== PUT User ", { updatedUser }, "===");

      const userDataForClient = {
        theme: updatedUser.theme,
        email: updatedUser.email,
        username: updatedUser.username,
        profileimg: updatedUser.profileimg,
        last_online: updatedUser.last_online,
      };

      res.status(200).json({ payload: userDataForClient });
    } catch (err) {
      console.error("500 Error during user put:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

users.delete(
  "/user",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const deletedUser = await deleteUser(decoded.user.id);
      console.log("=== DELETE User ", { deletedUser }, "===");

      res.status(200).json({ payload: deletedUser });
    } catch (err) {
      console.error("500 Error during user delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = users;
