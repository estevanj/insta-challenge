const { Router } = require("express");
const routes = Router();
const authMiddleware = require("./Middleware/auth");
const ValidationAuth = require("./Validations/ValidationAuth");
const AuthController = require("./Controllers/AuthController");

routes.post("/auth", ValidationAuth.login, AuthController.login);
routes.get(
  "/auth",
  authMiddleware,
  AuthController.howIam
);


module.exports = routes;
