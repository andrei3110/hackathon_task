import { Request, Response } from 'express';
import {Schools, Users, PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { createHook } from 'async_hooks';

const prisma: PrismaClient = new PrismaClient();

export class AuthController {

    async getLogin(req: Request, res: Response) {
        const schools  = await prisma.schools.findMany()
        res.render('User/login',{
            schools:schools,
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    async getregister(req: Request, res: Response) {
        const schools  = await prisma.schools.findMany()
        res.render('User/register',{
            schools:schools,
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
    async postLogin(req: Request, res: Response) {
        const { username, password,check_school } = req.body
        console.log(bcrypt.hashSync(password, 10))
        const user = await prisma.users.findMany({
            where:
            {
               username,
            }
        })
        if (user[0] != undefined) {
            if ( bcrypt.compareSync(password, String(user[0].password))) {
            
            const user1 = await prisma.users.findMany({ where: { username } ,
                select:{school:true,}
            })
            if(user1[0].school.name =='school_1'){
                req.session.admin=true
            }else{
                req.session.admin= false
            }
            req.session.auth = true
            res.redirect('/students')
            }
        }else{
            req.session.auth = false
            req.session.admin = false
            res.redirect('/login')
        }
    }
    async postRegister(req: Request, res: Response) {
        const { username, password,check_school } = req.body
        const school = await prisma.schools.findMany({
            where:{
                id:Number(check_school)
            }
        })
        
        const user = await prisma.users.findMany({ where: { username } })
        if (user[0] == undefined) {
            await prisma.users.create({
                data: {
                    username: String(username),
                    password: bcrypt.hashSync(password, 10),
                    school:{
                        connect: {
                            id: Number(check_school)
                        }
                    }
                
                }
            })
            const user1 = await prisma.users.findMany({ where: { username } })
            if(school[0].name == "school_1"){
                req.session.admin = true
            }else{
                req.session.admin = false
            }
            req.session.auth = true
            res.redirect('/')
        } else {
            req.session.auth = false
            req.session.admin = false
            res.redirect('/register')
        }
    }
    async logout(req: Request, res: Response) {
        req.session.admin = false
        req.session.auth = false
        res.redirect('/')
    }
}
