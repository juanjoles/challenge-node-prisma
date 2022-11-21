import express from 'express';
import { menuController } from './controllers/menuController';

const Router = express.Router()

Router.use('/menus', menuController);

export {Router};