import { Router } from "express";
import searchSuggestControler from "../controllers/searchSuggest.controler.js";
import searchResultController from "../controllers/searchResult.controller.js";

const router = Router();

router.get('/suggest', searchSuggestControler.suggestSearchResult);
router.get('/result', searchResultController.getSearchResult)

export default router;