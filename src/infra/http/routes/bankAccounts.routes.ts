import { Router } from "express";
import { CreateBankAccountsController, DeleteBankAccountsController, GetBankAccountsByIdController, GetBankAccountsController, UpdateBankAccountsController } from "../controllers";
import { ensureAuthenticated } from "@/shared";

const router = Router();

/* === PROPERTIES ROUTES ====*/
const create = new CreateBankAccountsController();
const update = new UpdateBankAccountsController();
const deleteControler = new DeleteBankAccountsController();
const getById = new GetBankAccountsByIdController();
const getAll = new GetBankAccountsController();

// router.use((req, res, next) => {
//   ensureAuthenticated(req, res, next);
// });

router.post("/bank-account/:userId", create.handle.bind(create));
router.put("/bank-account/:id", update.handle.bind(update));
router.delete("/bank-account/:id", deleteControler.handle.bind(deleteControler));
router.get("/bank-account/:userId", getById.handle.bind(getById));
router.get("/bank-account", getAll.handle.bind(getAll));

export default router;
