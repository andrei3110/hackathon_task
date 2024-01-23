import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class StudentsController {

    async index(req: Request, res: Response) {
        res.render('home',{
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    

    async getStudents(req: Request, res: Response) { 
        const student= await prisma.students.findMany({
            select:{
                id:true,
                first_Name:true,
                last_Name:true,
                date_of_birth:true,
                school:true,
                event:{
                    
                    select:{  
                        name:true,  
                        top_places:{
                            select:{
                                top_placesId:true
                            }
                        }
                    }
                },
            }
        })
        let students = []
        for(let j = 0; j < student.length; j++){
            for(let i = 0; i < student[j].event.top_places.length; i++){
                const places  = await prisma.top_places.findMany({
                    where:{
                        id:student[j].event.top_places[i].top_placesId
                    }
                })
                students.push({
                                id:student[j].id,
                                first_Name:student[j].first_Name,
                               last_Name:student[j].last_Name,
                               date:student[j].date_of_birth,
                               school:student[j].school.name,
                               event:student[j].event.name,
                               top_place:places[0].title
                            })
            }
        }
        
        res.render('Items/students',{
            students:students,
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    async getCreate(req: Request, res: Response) {
        const schools = await prisma.schools.findMany()
        const top_places = await prisma.top_places.findMany()
        const events = await prisma.events.findMany()
        res.render('Items/create',{
            schools:schools,
            top_places:top_places,
            events:events,
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    async getUpdate(req: Request, res: Response) {
        const schools = await prisma.schools.findMany()
        const top_places = await prisma.top_places.findMany()
        const events = await prisma.events.findMany()
        res.render(`Items/update`,{
            schools:schools,
            id:req.params.id,
            top_places:top_places,
            events:events,
            auth:req.session.auth,
            admin:req.session.admin
        });
    }


    async postUpdate(req: Request, res: Response) {
        const {first_Name,last_Name,date_of_birth,check_school, check_events, check_top_places} = req.body
        const student = await prisma.students.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                first_Name:String(first_Name),
                last_Name:String(last_Name),
                date_of_birth:String(date_of_birth),
                school:{
                    connect:{
                        id:Number(check_school) 
                    }
                },
                event:{
                    connect:{
                        id:Number(check_events)
                    }
                }
            }
        })
        const events_top_places = await prisma.events_top_places.create({
            data:{
                top_placesId:Number(check_top_places),
                eventId:    Number(check_events)
            }
        })

        res.redirect('/students')
    }


    async postCreate(req: Request, res: Response) {
        const {first_Name,last_Name,date_of_birth,check_school, check_events, check_top_places} = req.body
        const student = await prisma.students.create({
            data:{
                first_Name:String(first_Name),
                last_Name:String(last_Name),
                date_of_birth:String(date_of_birth),
                school:{
                    connect:{
                        id:Number(check_school)
                    }
                },
                event:{
                    connect:{
                        id:Number(check_events)
                    }
                }
            }
        })
        const events_top_places = await prisma.events_top_places.create({
            data:{
                top_placesId:Number(check_top_places),
                eventId:    Number(check_events)
            }
        })

        res.redirect('/create')
    }

}