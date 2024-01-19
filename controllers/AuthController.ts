import { Request, Response } from 'express';
import { Item, User, PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma: PrismaClient = new PrismaClient();

export class AuthController {

    async getLogin(req: Request, res: Response) {
        res.render('User/login',{
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async getregister(req: Request, res: Response) {
        res.render('User/register',{
            auth:req.session.auth,
            userId:req.session.userId,
            admin:req.session.admin
        });
    }
    async postLogin(req: Request, res: Response) {
        const { name, password, email } = req.body
        console.log(bcrypt.hashSync(password, 10))
        const user = await prisma.user.findMany({
            where:
            {
                email,
                name,
            }
        })
        if (user[0] != undefined) {
            if ( bcrypt.compareSync(password, String(user[0].password))) {
            
            const user1 = await prisma.user.findMany({ where: { email } })
            req.session.userId = user1[0].id
            if(user1[0].role == "Admin"){
                req.session.admin = true
            }else{
                req.session.admin = false
            }
            req.session.auth = true
            res.redirect('/')
            }
        }else{
            req.session.userId= undefined
            req.session.auth = false
            req.session.admin = false
            res.redirect('/login')
        }
    }
    async postRegister(req: Request, res: Response) {
        const { name, password, email } = req.body
        const user = await prisma.user.findMany({ where: { email } })
        if (user[0] == undefined) {
            await prisma.user.createMany({
                data: {
                    name: String(name),
                    password: bcrypt.hashSync(password, 10),
                    email: email,
                    role:'User'
                }
            })
            const user1 = await prisma.user.findMany({ where: { email } })
            req.session.userId = user1[0].id
            req.session.auth = true
            res.redirect('/')
        } else {
            req.session.userId= undefined
            req.session.auth = false
            req.session.admin = false
            res.redirect('/register')
        }
    }
    async logout(req: Request, res: Response) {
        req.session.userId= undefined
        req.session.admin = false
        req.session.auth = false
        res.redirect('/')
    }
}
