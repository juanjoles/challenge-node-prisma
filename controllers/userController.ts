import { Router, Request, Response, NextFunction } from "express";
const {PrismaClient} = require('@prisma/client')
import bcrypt from 'bcrypt'
import { celebrate, Joi, Segments } from 'celebrate'
const prisma = new PrismaClient()
const userController = Router()

const validateIdParameter = celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  })

const hashPassword = async (password:string) => {
    return bcrypt.hash(password, 10)
}

userController.post('/add', async(req:Request, res:Response) => {  
    
    try{  
       const {username,name,lastname,email,password} = req.body;
       const formatPassword = await hashPassword(password)
       const result = await prisma.user.create({
          data:{
                username,
                name,
                lastname,
                email,
                password:formatPassword
            }
        })
        res.status(200).json({message:result})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Error'})
    }
})

userController.delete('/delete/:id', async(req:Request, res:Response) => {
    try{
        const {id} = req.params
        const deleteUser = await prisma.user.delete({
            where:{id:Number(id)}
        })
        res.status(200).json({message:`User con id ${id} eliminado.`})
        
    }catch(err){
        res.status(500).json({message:"Internal Error"})
    }
})

userController.put('/update/:id',async(req:Request, res:Response) => {
    try{
        const {id} = req.params;
       const {username,name,lastname,email,password} = req.body;
       const formatPassword = await hashPassword(password)
        const result = await prisma.$queryRaw `select * from user where id = ${id}`;
        if(result.length == 0){
            res.status(200).json({message:'El id seleccionado no existe.'})
        }else{
            const updateMenu = await prisma.user.update({
                where:{id:Number(id)},
                data:{
                username,
                name,
                lastname,
                email,
                password:formatPassword
                }
            })
            res.status(200).json({message:`user con id ${id} modificado con exito.`})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Error"})
    }
})

userController.get('/all', async(req:Request, res:Response) => {
    try{
        const result = await prisma.user.findMany()
        res.status(200).json({message:result})
    }catch(err){
        res.status(500).json({message: 'Internal Error'})
    }
})

userController.get('/:id/menus', async(req:Request, res:Response) => {
    try{
        const {id} = req.params
        const parse = parseInt(id)
        const result = await prisma.user.findMany({
            where:{id:parse},
            include: {
                userid:true,
            }
        })
        res.status(200).json({message:result})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal Error'})
    }
})

userController.get('/:id',validateIdParameter, async(req:Request, res:Response) => {
    try{
        const {id} = req.params
        const result = await prisma.$queryRaw `select * from user where id = ${id}`;
        if(result.length == 0) {
            res.status(200).json({message:'El id seleccionado no existe.'})
        }else{
            res.status(200).json({message: result})
        }           
    }catch(err){
        res.status(500).json({message: 'Internal Error'})
    }
})



export {userController}