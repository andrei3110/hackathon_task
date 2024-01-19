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
            res.render('home', {
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    getCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma.category.findMany();
            res.render('Items/create', {
                category: category,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    postCreate(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const items = yield prisma.item.create({
                data: {
                    title: title,
                    description: description,
                    image: String((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname),
                    author: {
                        connect: {
                            id: Number(req.session.userId)
                        }
                    },
                    category: {
                        connect: {
                            id: Number(req.body.check_category)
                        }
                    }
                }
            });
            res.redirect('/create');
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemsController.js.map