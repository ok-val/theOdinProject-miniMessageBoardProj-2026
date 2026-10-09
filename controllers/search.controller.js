// import { messages } from '../models/messasges.model.js';
import * as db from '../db/queries.js';
import { validateInputQuery } from '../validators/search.validator.js';

const renderSearchPage = async (res, results = null) => {
  const messages = await db.findAllMessages();
  res.render('search', {
    title: 'Search',
    results: results,
    messages,
    errors: null
  });
};

const getSearchPage = async (req, res) => {
  renderSearchPage(res);
};

const getUserQueryResult = [
  validateInputQuery,
  async (req, res) => {
    const q = req.query['input--search'];
    // const results = messages.filter(
    //   (msg) => msg.user.toLowerCase() == q.toLowerCase()
    // );

    const results = await db.findQueryUser(q);
    renderSearchPage(res, results);
  }
];
export { getSearchPage, getUserQueryResult };
