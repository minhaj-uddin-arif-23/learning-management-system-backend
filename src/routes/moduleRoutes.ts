import { moduleControllers } from "../controllers/moduleControllers";
import { Router } from "express";
import { adminAccess, protectRoute } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/addModule",
  protectRoute,
  adminAccess,
  moduleControllers.createModule
);
router.get(
  "/course/:courseId",
  protectRoute,
  adminAccess,
  moduleControllers.getModulesByCourse
);
router.get("/:id", protectRoute, adminAccess, moduleControllers.getModuleById);

router.put("/:id", protectRoute, adminAccess, moduleControllers.updateModule);

router.delete(
  "/:id",
  protectRoute,
  adminAccess,
  moduleControllers.deleteModule
);

export const moduleRouters = router;
