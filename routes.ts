import express from 'express';
import { homeController } from './controllers/homeController';

const Router = express.Router()

Router.use('/menu', homeController);

export {Router};