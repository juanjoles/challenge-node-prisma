import express from 'express';
import { menuController } from './controllers/menuController';
import { userController } from './controllers/userController';

const Router = express.Router()

Router.use('/menus', menuController);
Router.use('/users', userController)

export {Router};