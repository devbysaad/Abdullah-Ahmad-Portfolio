const { Router } = require('express');
const { getPortfolioBundle } = require('../../services/portfolio.service');

const portfolioRouter = Router();

portfolioRouter.get('/', async (_req, res, next) => {
  try {
    const data = await getPortfolioBundle();
    return res.json(data);
  } catch (err) {
    return next(err);
  }
});

module.exports = { portfolioRouter };
