const express = require("express");

const routes = express.Router();

// middleware
const AuthMiddleware = require("./app/middlewares/Auth");
const UserMiddleware = require("./app/middlewares/User");
const MatterMiddleware = require("./app/middlewares/Matter");
const QuestionMiddleware = require("./app/middlewares/Question");
const CourseMiddleware = require("./app/middlewares/Course");


// controllers
const AuthController = require("./app/controllers/AuthController");
const UserController = require("./app/controllers/UserController");
const QuestionController = require("./app/controllers/QuestionController");
const AlternativeController = require("./app/controllers/AlternativeController");
const MatterController = require("./app/controllers/MatterController");
const CourseController = require("./app/controllers/CourseController");


// routes - public
routes.post("/auth", AuthController.store);
routes.post("/user", AuthMiddleware, UserController.store);
// routes - private

// user
routes.get(
  "/user/:id",
  AuthMiddleware,
  UserMiddleware,
  UserController.index
)
routes.get("/users", AuthMiddleware, UserController.getAll);

routes.get("/teachers", AuthMiddleware, UserController.getTeachers);

routes.put(
  "/user/:id",
  AuthMiddleware,
  UserMiddleware,
  UserController.update
);

routes.delete(
  "/user/:id",
  AuthMiddleware,
  UserMiddleware,
  UserController.delete
);

//questions

routes.get("/question", AuthMiddleware, QuestionController.getAll);

routes.get("/question/:id", AuthMiddleware, QuestionMiddleware, QuestionController.index);

routes.post("/question", AuthMiddleware, QuestionController.store);

routes.put(
  "/question/:id",
  AuthMiddleware,
  QuestionMiddleware,
  QuestionController.update
)

routes.delete(
  "/question/:id",
  AuthMiddleware,
  QuestionMiddleware,
  QuestionController.delete
);

//alternatives
routes.get("/alternatives/:idquestion", AuthMiddleware, AlternativeController.getByQuestion)

//matters
routes.post("/matter", AuthMiddleware, MatterController.store);

routes.get("/matters", AuthMiddleware, MatterController.getAll);

routes.put(
  "/matter/:id",
  AuthMiddleware,
  MatterMiddleware,
  MatterController.update
)

routes.get(
  "/matter/:id",
  AuthMiddleware,
  MatterMiddleware,
  MatterController.index
);

routes.delete(
  "/matter/:id",
  AuthMiddleware,
  MatterMiddleware,
  MatterController.delete
);

//courses
routes.get("/course/:id", CourseMiddleware, CourseController.index)

routes.post("/course", AuthMiddleware, CourseController.store);

routes.get("/course", AuthMiddleware, CourseMiddleware, CourseController.index)

module.exports = routes;