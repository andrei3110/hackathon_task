"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const multer_1 = __importDefault(require("multer"));
const StudentsController_1 = require("../controllers/StudentsController");
const AuthController_1 = require("../controllers/AuthController");
const EventController_1 = require("../controllers/EventController");
const SchoolController_1 = require("../controllers/SchoolController");
const studentsController = new StudentsController_1.StudentsController();
const authController = new AuthController_1.AuthController();
const eventController = new EventController_1.EventController();
const schoolController = new SchoolController_1.SchoolController();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
function registerRoutes(app) {
    app.get("/", (req, res) => {
        studentsController.index(req, res);
    });
    app.get("/create", (req, res) => {
        studentsController.getCreate(req, res);
    });
    app.get("/update/:id", (req, res) => {
        studentsController.getUpdate(req, res);
    });
    app.post("/update/:id", (req, res) => {
        studentsController.postUpdate(req, res);
    });
    app.get("/students", (req, res) => {
        studentsController.getStudents(req, res);
    });
    app.get("/create_events", (req, res) => {
        eventController.getCreate_Events(req, res);
    });
    app.get("/schools", (req, res) => {
        schoolController.getSchool(req, res);
    });
    app.post("/create_school", (req, res) => {
        schoolController.postCreate_School(req, res);
    });
    // AUTH
    app.get("/logout", (req, res) => {
        authController.logout(req, res);
    });
    app.get("/login", (req, res) => {
        authController.getLogin(req, res);
    });
    app.get("/register", (req, res) => {
        authController.getregister(req, res);
    });
    app.post("/register", (req, res) => {
        authController.postRegister(req, res);
    });
    app.post("/login", (req, res) => {
        authController.postLogin(req, res);
    });
    app.post("/create", upload.single("file"), (req, res) => {
        studentsController.postCreate(req, res);
    });
    app.post("/create_event", upload.single("file"), (req, res) => {
        eventController.postCreate_Event(req, res);
    });
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map