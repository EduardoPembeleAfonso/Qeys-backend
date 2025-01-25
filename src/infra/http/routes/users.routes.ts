import { Router } from "express";
import {
  CreateUserController,
  ForgotPasswordController,
  GetUserByIdController,
  GetUsersController,
  LoginUserController,
  ResetPasswordController,
  VerifyTokenController,
} from "../controllers";
import { ensureAuthenticated } from "@/shared";

const router = Router();

/* === USERS ROUTES ====*/
const createController = new CreateUserController();
const loginController = new LoginUserController();
const getByIdController = new GetUserByIdController();
const getAllUsersController = new GetUsersController();
const forgotPasswordController = new ForgotPasswordController();
const verifyTokenController = new VerifyTokenController();
const resetPasswordController = new ResetPasswordController();

router.post("/auth/create", createController.handle.bind(createController));

router.post("/auth/login", loginController.handle.bind(loginController));
router.post("/auth/forgot-password", forgotPasswordController.handle.bind(forgotPasswordController));
router.post("/auth/verify-token", verifyTokenController.handle.bind(verifyTokenController));
router.post("/auth/reset-password", resetPasswordController.handle.bind(resetPasswordController));

// router.use((req, res, next) => {
//   ensureAuthenticated(req, res, next);
// });
router.get("/user/:id", getByIdController.handle.bind(getByIdController));
router.get(
  "/users/:id",
  getAllUsersController.handle.bind(getAllUsersController)
);

export default router;
