import Account from '../entities/Account';
export default {
    registerAccount: async (firstName, lastName, email, password, { accountsRepository, authenticator }) => {
        password = await authenticator.encrypt(password);
        const account = new Account(undefined, firstName, lastName, email, password);
        return accountsRepository.persist(account);
    },
    getAccount: (accountId, { accountsRepository }) => {
        return accountsRepository.get(accountId);
    },
    find: ({ accountsRepository }) => {
        return accountsRepository.find();
    },
    findByEmail: (email, { accountsRepository }) => {
        return accountsRepository.getByEmail(email);
    },
    updateAccount: async (id, firstName, lastName, email, password, { accountsRepository, authenticator }) => {
        password = await authenticator.encrypt(password);
        const account = new Account(id, firstName, lastName, email, password);
        return accountsRepository.merge(account);
    },
    authenticate: async (email, password, { accountsRepository, authenticator, tokenManager }) => {
        const account = await accountsRepository.getByEmail(email);
        const result = await authenticator.compare(password, account.password);
        if (!result) throw new Error('Bad credentials');
        const token = tokenManager.generate({ email: account.email });
        return token;
    },
    verifyToken: async (token, { accountsRepository, tokenManager }) => {
        const decoded = await tokenManager.decode(token);
        const user = await accountsRepository.getByEmail(decoded.email);
        if (!user) {
            throw new Error('Bad token');
        }
        return user.email;
    },
    getFavourites: async (accountId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        return account.favourites;
    },
    addFavourite: async (accountId, movieId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        if (!account.favourites.includes(movieId)) {
            account.favourites.push(movieId);
            return await accountsRepository.merge(account);
        } else {
            return account;
        }
    },
    getFavouriteActor: async (accountId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        return account.favouriteActors;
      },
      addFavouriteActor: async (accountId, actorId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        if (!account.favouriteActors.includes(actorId)) {
          account.favouriteActors.push(actorId);
          return await accountsRepository.merge(account);
        } else {
            return account;
        }
      },
      getFavouriteTv: async (accountId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        return account.favouriteTvSeries;
      },
      addFavouriteTv: async (accountId, movieId, { accountsRepository }) => {
        const account = await accountsRepository.get(accountId);
        if (!account.favouriteTvSeries.includes(movieId)) {
          account.favouriteTvSeries.push(movieId);
        }
        return await accountsRepository.merge(account);
      }
};