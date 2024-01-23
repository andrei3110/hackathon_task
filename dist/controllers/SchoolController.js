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
exports.SchoolController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SchoolController {
    getSchool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('Items/create_schools', {
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    postCreate_School(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            yield prisma.schools.createMany({
                data: {
                    name: String(name)
                }
            });
            res.redirect('/schools');
        });
    }
}
exports.SchoolController = SchoolController;
//# sourceMappingURL=SchoolController.js.map