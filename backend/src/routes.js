const { Router } = require("express");
const routes = Router();
const authMiddleware = require("./Middleware/auth");
const ValidationAuth = require("./Validations/ValidationAuth");
const AuthController = require("./Controllers/AuthController");
const ValidationsUser = require("./Validations/ValidationUser");
const UserController = require("./Controllers/UserController");
const FeedController = require("./Controllers/FeedController");

routes.post("/auth", ValidationAuth.login, AuthController.login);
routes.get(
  "/auth",
  authMiddleware,
  AuthController.howIam
);

routes.get("/users/:username", authMiddleware, UserController.show);
routes.post("/users", ValidationsUser.withPassword, UserController.store);
routes.get("/follows", authMiddleware, FeedController.showFollow);
routes.get("/feeds", authMiddleware, FeedController.show);

module.exports = routes;
