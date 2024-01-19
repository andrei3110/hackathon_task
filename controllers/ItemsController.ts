import { Request, Response } from 'express';
import { Item,User,Category, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async index(req: Request, res: Response) {
        res.render('home',{
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async getCreate(req: Request, res: Response) {
        const category = await prisma.category.findMany()
        res.render('Items/create',{
            category:category,
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async postCreate(req: Request, res: Response) {
        const {title,description} = req.body
        const items = await prisma.item.create({
            data:{
                title:title,
                description:description,
                image: String(req.file?.originalname),
                author:{
                    connect: {
                        id: Number(req.session.userId)
                    }
                },
                category:{
                    connect:{
                        id:Number(req.body.check_category)
                    }
                }
            }
        })
        res.redirect('/create')
    }

}
