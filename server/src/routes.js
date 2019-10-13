const express = require("express");

const routes = express.Router();

// middleware
const AuthMiddleware = require("./app/middlewares/Auth");
const UserMiddleware = require("./app/middlewares/User");


// controllers
const AuthController = require("./app/controllers/AuthController");
const UserController = require("./app/controllers/UserController");


// routes - public
routes.post("/auth", AuthController.store);
routes.post("/user", UserController.store);
// routes - private
// user
routes.get(
  "/user/:id",
  AuthMiddleware,
  UserMiddleware,
  UserController.index
)
routes.get("/users",AuthMiddleware, UserController.getAll);
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

// emplyees
// routes.get("/employees", AuthMiddleware, EmployeeController.list);
// routes.post("/employees", AuthMiddleware, EmployeeController.store);
// routes.put(
//   "/employees/:id",
//   AuthMiddleware,
//   EmployeeMiddleware,
//   EmployeeController.update
// );
// routes.get(
//   "/employees/:id",
//   AuthMiddleware,
//   EmployeeMiddleware,
//   EmployeeController.index
// );
// routes.delete(
//   "/employees/:id",
//   AuthMiddleware,
//   EmployeeMiddleware,
//   EmployeeController.delete
// );
// // companys
// routes.get("/companys", AuthMiddleware, CompanyController.index);
// routes.post("/companys", AuthMiddleware, CompanyController.store);
// routes.put(
//   "/companys/:id",
//   AuthMiddleware,
//   CompanyMiddleware,
//   CompanyController.update
// );
// routes.get(
//   "/companys/:id",
//   AuthMiddleware,
//   CompanyMiddleware,
//   CompanyController.index
// );
// routes.delete(
//   "/companys/:id",
//   AuthMiddleware,

//   CompanyMiddleware,

//   CompanyController.delete
// );


module.exports = routes;