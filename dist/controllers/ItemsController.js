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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('home');
        });
    }
    getUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({
                where: {
                    id: 1
                }
            });
            res.status(200).json(users);
        });
    }
    bitcoin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('bitcoin');
        });
    }
    data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany();
            res.status(200).json(items);
        });
    }
    clicker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.users.update({
                where: {
                    id: 1
                },
                data: {
                    balance: req.body.count
                }
            });
            res.status(200).end();
        });
    }
    createData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.items.create({
                data: {
                    time: req.body.time,
                    open: req.body.open,
                    close: req.body.close,
                    high: req.body.high,
                    low: req.body.low
                }
            });
            res.status(200).end();
        });
    }
    buyCript(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany({ take: 1 });
            yield prisma.items.delete({
                where: {
                    id: items[0].id
                }
            });
            res.redirect("/");
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemsController.js.map