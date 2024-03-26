import { Router } from "express";
import searchControler from "../controllers/search.controller.js";

const router = Router();

router.get('/', searchControler.search);
router.get('/suggest', searchControler.suggestSearchResult);

export default router;