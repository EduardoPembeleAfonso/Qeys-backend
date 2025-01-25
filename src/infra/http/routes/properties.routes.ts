import { Router } from "express";
import {
  CreatePropertiesController,
  DeletePropertiesController,
  GetPropertiesByIdController,
  GetPropertiesController,
  UpdateLikesPropertiesController,
  UpdatePropertiesController,
} from "../controllers";
import { ensureAuthenticated } from "@/shared";

const router = Router();

/* === PROPERTIES ROUTES ====*/
const create = new CreatePropertiesController();
const update = new UpdatePropertiesController();
const deleteControler = new DeletePropertiesController();
const getById = new GetPropertiesByIdController();
const getAll = new GetPropertiesController();
const updateLikes = new UpdateLikesPropertiesController();

import multer from "multer";
import { uploadFile } from "@/helpers/functions/fileHandler.helper";

const upload = multer({
  storage: multer.memoryStorage(),
});

// router.use((req, res, next) => {
//   ensureAuthenticated(req, res, next);
// });

router.post("/properties/:userId", upload.single("photo"),  uploadFile, create.handle.bind(create));
router.put("/properties/:id", upload.single("photo"), uploadFile, update.handle.bind(update));
router.put("/properties/likes/:id", updateLikes.handle.bind(updateLikes));
router.delete("/properties/:id", deleteControler.handle.bind(deleteControler));
router.get("/properties/:userId", getById.handle.bind(getById));
router.get("/properties", getAll.handle.bind(getAll));

export default router;
