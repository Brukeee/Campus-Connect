import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js";
import { getAll, getOne, createNew, update, deleteOne } from "../controllers/university.controller.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', createNew); // Require auth for creating
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router