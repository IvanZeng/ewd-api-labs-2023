import accountService from "../services";

export default (dependencies) => {
    const createAccount = async (request, response) => {
        const { firstName, lastName, email, password } = request.body;
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        response.status(201).json(account);
    };

    const getAccount = async (request, response) => {
        const accountId = request.params.id;
        const account = await accountService.getAccount(accountId, dependencies);
        response.status(200).json(account);
    };

    const listAccounts = async (request, response) => {
        const accounts = await accountService.find(dependencies);
        response.status(200).json(accounts);
    };

    const updateAccount = async (request, response) => {
        try {
            const id = +request.params.id;
            const { firstName, lastName, email, password } = request.body;
            const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
            response.status(200).json(account);
        } catch (error) {
            response.status(400);
        }
    };

    const authenticateAccount = async (request, response) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };

    const verify = async (request, response, next) => {
        try {
            const authHeader = request.headers.authorization;
            const accessToken = authHeader.split(" ")[1];
            await accountService.verifyToken(accessToken, dependencies);
            next();
        } catch (err) {
            //Token Verification Failed
            response.status(401).json({ message: 'Unauthorised' });
            next(new Error(`Verification Failed ${err.message}`));
        }
    };

    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const addFavouriteActor = async (request, response, next) => {
        try {
          const { actorId } = request.body;
          const id = request.params.id;
          const account = await accountService.addFavouriteActor(id, actorId, dependencies);
          response.status(200).json(account);
        } catch (err) {
          next(new Error(`Invalid Data ${err.message}`));
        }
      };
      const getFavouriteActors = async (request, response, next) => {
        try {
          const id = request.params.id;
          const favouriteAcotor = await accountService.getFavouriteActor(id, dependencies);
          response.status(200).json(favouriteAcotor);
        } catch (err) {
          next(new Error(`Invalid Data ${err.message}`));
        }
      };
      const addFavouriteTv = async (request, response, next) => {
        try {
          const { movieId } = request.body;
          const id = request.params.id;
          const account = await accountService.addFavouriteTv(id, movieId, dependencies);
          response.status(200).json(account);
        } catch (err) {
          next(new Error(`Invalid Data ${err.message}`));
        }
      };
      const getFavouriteTv = async (request, response, next) => {
        try {
          const id = request.params.id;
          const favouriteTV = await accountService.getFavouriteTv(id, dependencies);
          response.status(200).json(favouriteTV);
        } catch (err) {
          next(new Error(`Invalid Data ${err.message}`));
        }
      };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        addFavourite,
        getFavourites,
        addFavouriteActor,
        getFavouriteActors,
        addFavouriteTv,
        getFavouriteTv,
        verify
    };
};