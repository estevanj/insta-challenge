const { Router } = require("express");
const multer = require("multer");
const routes = Router();
const authMiddleware = require("./Middleware/auth");
const ValidationAuth = require("./Validations/ValidationAuth");
const AuthController = require("./Controllers/AuthController");
const ValidationsUser = require("./Validations/ValidationUser");
const UserController = require("./Controllers/UserController");
const FeedController = require("./Controllers/FeedController");
const SearchController = require("./Controllers/SearchController");
const multerConfig = require("./Config/multer");
const PhotoController = require("./Controllers/PhotoController");
const FollowController = require("./Controllers/FollowController");

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
routes.get("/search/:term", authMiddleware, SearchController.search);

routes.post(
  "/photos",
  authMiddleware,
  multer(multerConfig).single("file"),
  PhotoController.store
);
routes.get("/photos/:id", authMiddleware, PhotoController.show);

routes.post("/follows/:user_id", authMiddleware, FollowController.store);

module.exports = routes;
