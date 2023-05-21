import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    const moviesController = MoviesController(dependencies);
    const accountsController = AccountsController(dependencies);

    // router.route('/*').all(accountsController.verify);
    router.route('/').get(moviesController.find);
    router.route('/:id').get(accountsController.verify, moviesController.getMovie);
    router.route('/upcoming').get(moviesController.getUpcomingMovies);
    router.route('/:id/similar').get(accountsController.verify, moviesController.getSimilar);
    router.route('/:id/reviews').get(accountsController.verify, moviesController.getMovieReviews);



    return router;
};
export default createMoviesRouter;