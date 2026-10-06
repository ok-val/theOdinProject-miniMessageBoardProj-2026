import { messages } from '../models/messasges.model.js';
import { validateInputQuery } from '../validators/search.validator.js';

const renderSearchPage = (res, results) => {
  res.render('search', {
    title: 'Search',
    results: results,
    messages,
    errors: null
  });
};

const getSearchPage = (req, res) => {
  renderSearchPage(res);
};

const getUserQueryResult = [
  validateInputQuery,
  (req, res) => {
    const q = req.query['input--search'];
    const results = messages.filter(
      (msg) => msg.user.toLowerCase() == q.toLowerCase()
    );

    console.log(results);
    renderSearchPage(res, results);
  }
];
export { getSearchPage, getUserQueryResult };
