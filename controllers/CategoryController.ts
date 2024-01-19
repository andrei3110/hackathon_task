import { Request, Response } from 'express';
import { Item, User, PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma: PrismaClient = new PrismaClient();

export class CategoryController {
    async getCategory(req: Request, res: Response) {
        const categories = await prisma.category.findMany()
        res.render('Items/categories',{
            categories:categories,
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async category(req: Request, res: Response) {
        const items = await prisma.item.findMany({
            where:{
                categoryId: Number(req.params.id)
            },
            select:{
                author:true,
                title:true,
                id:true,
                description:true,
                image:true
           }
        })
        
        res.render('Items/items',{
            categoryId:Number(req.params.id),
            items:items,
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async saveToCart(req: Request, res: Response) {
        const {id} = req.params
        const cart = await prisma.cart.findMany({
            where: {
                itemId: Number(id),
                userId: Number(req.session.userId)
            }
        })
        if (cart[0] == undefined) {
            await prisma.cart.create({
                data: {
                    itemId: Number(id),
                    userId: Number(req.session.userId)
                }
            })
        }
        
        res.redirect(`/category/${req.body.categoryId}`);
    }
    async unsaveCart(req: Request, res: Response) {
        const {id} = req.params
        const cart = await prisma.cart.deleteMany({
            where: {
                itemId: Number(id), 
            }
        })
        res.redirect(`/cart`);
    }
    async getCart(req: Request, res: Response) {
        
        const user = await prisma.user.findMany({
            where: {
                id: req.session.userId
            },
            select: {
                Items: {
                    select: {
                        items: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        })
        let arr = []
        for (let i = 0; i < user[0].Items.length; i++) {
            arr.push(user[0].Items[i].items.id)
        }
        const items = await prisma.item.findMany({
            where: {
                id: {
                    in: arr
                }
            },
            select:{
                author:true,
                title:true,
                id:true,
                description:true,
                image:true
            }
        })
        res.render('Cart/index',{
            
            items:items,
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
}