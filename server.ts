import "dotenv/config";
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Router } from './routes';

const prisma = new PrismaClient()
const app = express();

app.use(express.json())

app.use('/', Router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})