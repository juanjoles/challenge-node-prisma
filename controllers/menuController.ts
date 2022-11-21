import { Router, Request, Response, NextFunction } from "express";
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const menuController = Router()


menuController.post('/add', async(req:Request, res:Response) => {  
    
    try{  
       const {name,parentId} = req.body;
       const result = await prisma.menu.create({
          data:{
                name,
                parentId
            }
        })
        res.status(200).json({message:result})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Error'})
    }
})

menuController.delete('/delete/:id', async(req:Request, res:Response) => {
    try{
        const {id} = req.params
        const result = await prisma.$queryRaw `select * from menu where parentId = ${id}`
        if(result.length != 0){
            res.status(200).json({message:"No es posible eliminar este menu, debido a que se encuentra asociado a otros."})
        }else{
            const deleteMenu = await prisma.menu.delete({
                where:{id:Number(id)}
            })
            res.status(200).json({message:`Menu con id ${id} eliminado.`})
        }
    }catch(err){
        res.status(500).json({message:"Internal Error"})
    }
})

menuController.put('/update/:id',async(req:Request, res:Response) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        const result = await prisma.$queryRaw `select * from menu where id = ${id}`;
        if(result.length == 0){
            res.status(200).json({message:'El id seleccionado no existe.'})
        }else{
            const updateMenu = await prisma.menu.update({
                where:{id:Number(id)},
                data:{name}
            })
            res.status(200).json({message:`Menu con id ${id} modificado con exito.`})
        }
    }catch(err){
        res.status(500).json({message:"Internal Error"})
    }
})

menuController.get('/:id', async(req:Request, res:Response) => {
    try{
        const {id} = req.params
        const result = await prisma.$queryRaw `select * from menu where id = ${id}`;
        if(result.length == 0) {
            res.status(200).json({message:'El id seleccionado no existe.'})
        }else{
            res.status(200).json({message: result})
        }           
    }catch(err){
        res.status(500).json({message: 'Internal Error'})
    }
})

menuController.get('/all', async(req:Request, res:Response) => {
    try{
        const result = await prisma.menu.findMany({
            where:{
                parent : null,
            },
            include: {
                children:true,
            }
        })
        res.status(200).json({message:result})
    }catch(err){
        res.status(500).json({message: 'Internal Error'})
    }
})

export {menuController};