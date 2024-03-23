import { Router } from "express";
import searchControler from "../controllers/search.controler.js";

const router = Router();

router.get('/suggest', searchControler.suggestSearchResult);

export default router;