import { Router } from "express";
import baseRoute from "./baseRoute.routes";
import usersRoutes from "./users.routes";
import properties from "./properties.routes";
import scheduling from "./scheduling.routes";
import schedulingPhotos from "./schedulingPhotos.routes";

const router = Router();

router.use(baseRoute);
router.use(usersRoutes);
router.use(properties);
router.use(scheduling);
router.use(schedulingPhotos);

export default router;
