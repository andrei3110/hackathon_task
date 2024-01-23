import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class EventController {
    async getCreate_Events(req: Request, res: Response) {
        const schools = await prisma.schools.findMany()
        res.render('Items/create_events',{
            schools:schools,
            auth:req.session.auth,
          
            admin:req.session.admin
        });
    }
    
    async postCreate_Event(req: Request, res: Response) {
        const {name,date,check_school} = req.body
        await prisma.events.create({
            data:{
                name:name,
                date:date,
                school:{
                    connect:{
                        id:Number(check_school)
                    }
                }
            }
        })
        res.redirect('/create_events')
    }
}