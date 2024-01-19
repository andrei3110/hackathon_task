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
exports.CategoryController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryController {
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.category.findMany();
            res.render('Items/categories', {
                categories: categories,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.item.findMany({
                where: {
                    categoryId: Number(req.params.id)
                },
                select: {
                    author: true,
                    title: true,
                    id: true,
                    description: true,
                    image: true
                }
            });
            res.render('Items/items', {
                categoryId: Number(req.params.id),
                items: items,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    saveToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cart = yield prisma.cart.findMany({
                where: {
                    itemId: Number(id),
                    userId: Number(req.session.userId)
                }
            });
            if (cart[0] == undefined) {
                yield prisma.cart.create({
                    data: {
                        itemId: Number(id),
                        userId: Number(req.session.userId)
                    }
                });
            }
            res.redirect(`/category/${req.body.categoryId}`);
        });
    }
    unsaveCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cart = yield prisma.cart.deleteMany({
                where: {
                    itemId: Number(id),
                }
            });
            res.redirect(`/cart`);
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findMany({
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
            });
            let arr = [];
            for (let i = 0; i < user[0].Items.length; i++) {
                arr.push(user[0].Items[i].items.id);
            }
            const items = yield prisma.item.findMany({
                where: {
                    id: {
                        in: arr
                    }
                },
                select: {
                    author: true,
                    title: true,
                    id: true,
                    description: true,
                    image: true
                }
            });
            res.render('Cart/index', {
                items: items,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map