import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'reflect-metadata';
import './helpers/configs/environments.config';
import 'express-async-errors';
import logger from 'morgan'
import { ErrorsExceptions, VERSION } from './helpers';
import routes from './infra/http/routes';
import './shared/containers/index';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json({ limit: '500mb' }));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.urlencoded({ limit: '500mb', extended: false }));

app.use(cors());

app.use(VERSION.current, routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorsExceptions(err, req, res, next);
});



export default app;