import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Router } from './routes';

const prisma = new PrismaClient()
const app = express();

app.use(express.json())

app.use('/', Router)

app.listen(3000, () => {
    console.log('Server is running');
})