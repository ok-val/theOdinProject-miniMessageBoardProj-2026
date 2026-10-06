import express from 'express';
import {
  getSearchPage,
  getUserQueryResult
} from '../controllers/search.controller.js';

const search_router = express.Router();

search_router.get('/', getSearchPage);

search_router.get('/result', getUserQueryResult);

export default search_router;
