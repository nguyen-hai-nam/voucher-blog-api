import { Router } from "express";
import searchControler from "../controllers/search.controler.js";
import searchResultController from "../controllers/searchResult.controller.js";

const router = Router();

router.get('/suggest', searchControler.suggestSearchResult);
router.get('/result', searchResultController.getSearchResult)

export default router;