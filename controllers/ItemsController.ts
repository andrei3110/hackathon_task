import { Request, Response } from 'express';
import { items, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {



    async index(req: Request, res: Response) {
        res.render('home');
    }

    async data(req: Request, res: Response) {
       const items = await prisma.items.findMany()
        res.status(200).json(items);
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
        res.status(200)
    }
}
