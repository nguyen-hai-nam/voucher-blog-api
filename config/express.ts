import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from '../routes/index.route';
import errorHandler from '../middlewares/errorHandler.middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/', routes);
app.use('/', errorHandler);

export default app;
