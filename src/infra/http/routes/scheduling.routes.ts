import { Router } from "express";
import {
  CancellSchedulingController,
  CreateSchedulingController,
  DeleteSchedulingController,
  GetSchedulingByIdController,
  GetSchedulingByPropertieIdController,
  GetSchedulingByUserIdController,
  GetSchedulingController,
  UpdateSchedulingController,
} from "../controllers";
// import { ensureAuthenticated } from "@/shared";

const router = Router();

/* === SCHEDULING ROUTES ====*/
const create = new CreateSchedulingController();
const update = new UpdateSchedulingController();
const cancel = new CancellSchedulingController();
const deleteControler = new DeleteSchedulingController();
const getById = new GetSchedulingByIdController();
const getAll = new GetSchedulingController();
const getByPropertieId = new GetSchedulingByPropertieIdController();
const getByUserId = new GetSchedulingByUserIdController();

// router.use((req, res, next) => {
//   ensureAuthenticated(req, res, next);
// });
router.post("/scheduling", create.handle.bind(create));
router.put("/scheduling/:id", update.handle.bind(update));
router.put("/cancel-scheduling/:id", cancel.handle.bind(cancel));
router.delete("/scheduling/:id", deleteControler.handle.bind(deleteControler));
router.get("/scheduling", getAll.handle.bind(getAll));
router.get("/scheduling/:id", getById.handle.bind(getById));
router.get("/scheduling-by-properties/:propertiesId", getByPropertieId.handle.bind(getByPropertieId));
router.get("/scheduling-by-user/:userId", getByUserId.handle.bind(getByUserId));

export default router;
