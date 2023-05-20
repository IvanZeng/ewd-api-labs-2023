import dotenv from 'dotenv';
import express from 'express';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from './src/config/dependencies';
import createMoviesRouter from './src/movies/routes';
import createGenresRouter from './src/genres/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
import createActorsRouter from './src/actors/routes';

dotenv.config();
db.init();

const dependencies = buildDependencies();
const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/genres', createGenresRouter(dependencies));
app.use('/api/actors', createActorsRouter(dependencies));
app.use(errorHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
