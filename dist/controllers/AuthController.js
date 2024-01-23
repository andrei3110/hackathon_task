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
            const schools = yield prisma.schools.findMany();
            res.render('User/login', {
                schools: schools,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    getregister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schools = yield prisma.schools.findMany();
            res.render('User/register', {
                schools: schools,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, check_school } = req.body;
            console.log(bcrypt_1.default.hashSync(password, 10));
            const user = yield prisma.users.findMany({
                where: {
                    username,
                }
            });
            if (user[0] != undefined) {
                if (bcrypt_1.default.compareSync(password, String(user[0].password))) {
                    const user1 = yield prisma.users.findMany({ where: { username },
                        select: { school: true, }
                    });
                    if (user1[0].school.name == 'school_1') {
                        req.session.admin = true;
                    }
                    else {
                        req.session.admin = false;
                    }
                    req.session.auth = true;
                    res.redirect('/students');
                }
            }
            else {
                req.session.auth = false;
                req.session.admin = false;
                res.redirect('/login');
            }
        });
    }
    postRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, check_school } = req.body;
            const school = yield prisma.schools.findMany({
                where: {
                    id: Number(check_school)
                }
            });
            const user = yield prisma.users.findMany({ where: { username } });
            if (user[0] == undefined) {
                yield prisma.users.create({
                    data: {
                        username: String(username),
                        password: bcrypt_1.default.hashSync(password, 10),
                        school: {
                            connect: {
                                id: Number(check_school)
                            }
                        }
                    }
                });
                const user1 = yield prisma.users.findMany({ where: { username } });
                if (school[0].name == "school_1") {
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                }
                req.session.auth = true;
                res.redirect('/');
            }
            else {
                req.session.auth = false;
                req.session.admin = false;
                res.redirect('/register');
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.admin = false;
            req.session.auth = false;
            res.redirect('/');
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map