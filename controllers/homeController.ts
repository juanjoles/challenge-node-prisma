import { Router, Request, Response, NextFunction } from "express";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const homeController = Router()


homeController.post('/add', async(req:Request, res:Response) => {
    
    try{
        const {name,parentId,children} = req.body;
       const result = await prisma.menu.create({
          data:{
                name,
                parentId,
                children
            }
        })
        res.json(result)
    }catch(e){
        console.log(e)
    }
})

homeController.get('/add', async(req:Request, res:Response) => {
    try{
        const result = await prisma.$queryRaw `select * from menu`
        res.send(result)
    }catch(e){
        console.log(e)
    }
})

export {homeController};