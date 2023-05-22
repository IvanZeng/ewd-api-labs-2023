import express from 'express';
import AccountsController from '../controllers';
import ValidationController from '../controllers/ValidationController';
const createRouter = (dependencies) => {
    const router = express.Router();
    const accountsController = AccountsController(dependencies);
    const validationController = ValidationController(dependencies);
    router.route('/').get(accountsController.verify, accountsController.listAccounts);
    router.route('/').post(validationController.validateAccount, accountsController.createAccount);
    router.route('/:id').get(accountsController.verify, accountsController.getAccount);
    router.route('/:id').put(accountsController.updateAccount);
    router.route('/:id/favourites').post(accountsController.addFavourite);
    router.route('/:id/favourites').get(accountsController.verify, accountsController.getFavourites);
    router.route('/security/token').post(accountsController.authenticateAccount);
    router.route('/:id/favourite_actors').post(accountsController.addFavouriteActor);
    router.route('/:id/favourite_actors').get(accountsController.verify, accountsController.getFavouriteActors);
    router.route('/:id/favourite_tv').post(accountsController.addFavouriteTv);
    router.route('/:id/favourite_tv').get(accountsController.verify, accountsController.getFavouriteTv);

    return router;
};
export default createRouter;