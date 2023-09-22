import express from "express";
const router = express.Router();
import {authorize} from "../middleware/authorize.js"
import deleteUser from "./delete.js";
import loginUser from "./login.js";
import registerUser from "./register.js";
import updateUser from "./update.js";
import addTask from "./addTask.js";
import getTasks from "./getTasks.js";

router.post("/register", registerUser);

router.post("/login", loginUser)

router.post("/:id", authorize, updateUser);

router.delete("/:id", authorize, deleteUser);

router.post("/task/add-task", authorize, addTask);

router.get("/task/get-tasks", authorize, getTasks);

export default router;
