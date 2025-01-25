import { Router } from "express";
import { CreateSchedulingPhotosController, DeleteSchedulingPhotosController, GetSchedulingPhotosByIdController, GetSchedulingPhotosController, UpdateSchedulingPhotosController } from "../controllers/schedulingPhotos";
// import { ensureAuthenticated } from "@/shared";

const router = Router();

/* === SCHEDULING ROUTES ====*/
const create = new CreateSchedulingPhotosController();
const update = new UpdateSchedulingPhotosController();
const deleteControler = new DeleteSchedulingPhotosController();
const getById = new GetSchedulingPhotosByIdController();
const getAll = new GetSchedulingPhotosController();

// router.use((req, res, next) => {
//   ensureAuthenticated(req, res, next);
// });
router.post("/scheduling-photos", create.handle.bind(create));
router.put("/scheduling-photos/:id", update.handle.bind(update));
router.delete("/scheduling-photos/:id", deleteControler.handle.bind(deleteControler));
router.get("/scheduling-photos/:id", getById.handle.bind(getById));
router.get("/scheduling-photos/:propertiesId", getAll.handle.bind(getAll));

export default router;
