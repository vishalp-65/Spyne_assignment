import { Router } from "express";
import { AuthController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/userAuth.js";

const router = Router();

let authController = new AuthController();

// Auth creation and login routes
router.post("/signup", authController.createUser);
router.post("/login", authController.logIn);

// Get all users
router.get("/users", authenticate, authController.getAllUsers);

// Search user by name
router.get("/users/search", authenticate, authController.searchUser);

// User updation and deletion routes
router.put("/users/:id", authenticate, authController.updateUser);
router.delete("/users/:id", authenticate, authController.deleteUser);

export default router;
