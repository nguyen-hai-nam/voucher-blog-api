import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import routes from '../routes/index.route.js';
import errorHandler from '../middlewares/errorHandler.middleware.js';
import { uploadDirectory } from '../constants/path.constant.js';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true, limit: '100kb' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use(`/${uploadDirectory}`, express.static(uploadDirectory));
app.use('/', routes);
app.use('/', errorHandler);

export default app;
