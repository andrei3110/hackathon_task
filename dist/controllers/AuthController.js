"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthController {
    getLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('User/login', {
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    getregister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('User/register', {
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            console.log(bcrypt_1.default.hashSync(password, 10));
            const user = yield prisma.user.findMany({
                where: {
                    email,
                    name,
                }
            });
            if (user[0] != undefined) {
                if (bcrypt_1.default.compareSync(password, String(user[0].password))) {
                    const user1 = yield prisma.user.findMany({ where: { email } });
                    req.session.userId = user1[0].id;
                    if (user1[0].role == "Admin") {
                        req.session.admin = true;
                    }
                    else {
                        req.session.admin = false;
                    }
                    req.session.auth = true;
                    res.redirect('/');
                }
            }
            else {
                req.session.userId = undefined;
                req.session.auth = false;
                req.session.admin = false;
                res.redirect('/login');
            }
        });
    }
    postRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const user = yield prisma.user.findMany({ where: { email } });
            if (user[0] == undefined) {
                yield prisma.user.createMany({
                    data: {
                        name: String(name),
                        password: bcrypt_1.default.hashSync(password, 10),
                        email: email,
                        role: 'User'
                    }
                });
                const user1 = yield prisma.user.findMany({ where: { email } });
                req.session.userId = user1[0].id;
                req.session.auth = true;
                res.redirect('/');
            }
            else {
                req.session.userId = undefined;
                req.session.auth = false;
                req.session.admin = false;
                res.redirect('/register');
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.userId = undefined;
            req.session.admin = false;
            req.session.auth = false;
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map