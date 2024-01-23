import { Request, Response } from 'express';
import { Schools,PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class SchoolController {
    async getSchool(req: Request, res: Response) {
        res.render('Items/create_schools',{
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    
    async postCreate_School(req: Request, res: Response) {
        const {name} = req.body
        await prisma.schools.createMany({
            data:{
                name:String(name)
            }
        })
        res.redirect('/schools')
    }
}