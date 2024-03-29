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
    getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield prisma.students.findMany({
                select: {
                    first_Name: true,
                    last_Name: true,
                    date_of_birth: true,
                    school: true,
                    event: {
                        select: {
                            name: true,
                            top_places: {
                                select: {
                                    top_placesId: true
                                }
                            }
                        }
                    },
                }
            });
            let students = [];
            // console.log(students[0].event)
            for (let j = 0; j < student.length; j++) {
                for (let i = 0; i < student[j].event.top_places.length; i++) {
                    const places = yield prisma.top_places.findMany({
                        where: {
                            id: student[j].event.top_places[i].top_placesId
                        }
                    });
                    students.push({ first_Name: student[j].first_Name,
                        last_Name: student[j].last_Name,
                        date: student[j].date_of_birth,
                        school: student[j].school.name,
                        event: student[j].event.name,
                        top_place: places[0].title
                    });
                }
            }
            res.render('Items/items', {
                students: students,
                // top_places:top_places,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    getCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schools = yield prisma.schools.findMany();
            const top_places = yield prisma.top_places.findMany();
            const events = yield prisma.events.findMany();
            res.render('Items/create', {
                schools: schools,
                top_places: top_places,
                events: events,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    getCreate_Events(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schools = yield prisma.schools.findMany();
            res.render('Items/create_events', {
                schools: schools,
                auth: req.session.auth,
                userId: req.session.userId,
                admin: req.session.admin
            });
        });
    }
    postCreate_Event(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, date, check_school } = req.body;
            yield prisma.events.create({
                data: {
                    name: name,
                    date: date,
                    school: {
                        connect: {
                            id: Number(check_school)
                        }
                    }
                }
            });
            res.redirect('/create_events');
        });
    }
    postCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_Name, last_Name, date_of_birth, check_school, check_events, check_top_places } = req.body;
            const student = yield prisma.students.create({
                data: {
                    first_Name: String(first_Name),
                    last_Name: String(last_Name),
                    date_of_birth: String(date_of_birth),
                    school: {
                        connect: {
                            id: Number(check_school)
                        }
                    },
                    event: {
                        connect: {
                            id: Number(check_events)
                        }
                    }
                }
            });
            const events_top_places = yield prisma.events_top_places.create({
                data: {
                    top_placesId: Number(check_top_places),
                    eventId: Number(check_events)
                }
            });
            res.redirect('/create');
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemsController.js.map