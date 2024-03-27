import { Router } from "express";

import searchSuggestController from "../controllers/searchSuggest.controller.js";
import searchResultController from "../controllers/searchResult.controller.js";

const router = Router();

router.get('/suggest', searchSuggestController.suggestSearchResult);
router.get('/result', searchResultController.getSearchResult)


export default router;