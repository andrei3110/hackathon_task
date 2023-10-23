import { Request, Response } from 'express';
import { items,users, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {



    async index(req: Request, res: Response) {
        res.render('home');
    }
    async getUserData(req: Request, res: Response) {
        const users = await prisma.users.findMany({
            where:{
                id: 1
            }
        })
        res.status(200).json(users)
    }
    async bitcoin(req: Request, res: Response) {
        res.render('bitcoin');
    }
    async data(req: Request, res: Response) {
       const items = await prisma.items.findMany()
        res.status(200).json(items);
    }
    async clicker(req: Request, res: Response) {

        await prisma.users.update({
            where:{
                id: 1
            },
            data:{
                balance:req.body.count
            }
        })
        res.status(200).end()
    }
    async createData(req: Request, res: Response) {
        await prisma.items.create({
            data:{
                time:req.body.time,
                open:req.body.open,
                close:req.body.close,
                high:req.body.high,
                low:req.body.low
            }
        })
        res.status(200).end()
    }
    async buyCript(req: Request, res: Response) {
        const items = await prisma.items.findMany({take:1})

        await prisma.items.delete({
            where:{
                id:items[0].id
            }
        })
        res.redirect("/")
    }
}
