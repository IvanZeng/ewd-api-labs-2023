import express from 'express';
import TvSeriesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createTvSeriesRouter = (dependencies) => {
  const router = express.Router();
  // load controllers with dependencies
  const tvSeriesController = TvSeriesController(dependencies);
  const accountsController = AccountsController(dependencies);

  router.route('/*').all(accountsController.verify);
  router.route('/:id').get(tvSeriesController.getTvSeries);
  router.route('/').get(tvSeriesController.find);
  router.route('/:id/similar').get(tvSeriesController.getSimilar);

  return router;
};
export default createTvSeriesRouter;