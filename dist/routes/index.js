"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const multer_1 = __importDefault(require("multer"));
const ItemsController_1 = require("../controllers/ItemsController");
const AuthController_1 = require("../controllers/AuthController");
const CategoryController_1 = require("../controllers/CategoryController");
const itemsController = new ItemsController_1.ItemsController();
const authController = new AuthController_1.AuthController();
const categoryController = new CategoryController_1.CategoryController();
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
        itemsController.index(req, res);
    });
    app.get("/create", (req, res) => {
        itemsController.getCreate(req, res);
    });
    app.get("/category", (req, res) => {
        categoryController.getCategory(req, res);
    });
    app.get("/category/:id", (req, res) => {
        categoryController.category(req, res);
    });
    app.post("/save/:id", (req, res) => {
        categoryController.saveToCart(req, res);
    });
    app.post("/delete_save/:id", (req, res) => {
        categoryController.unsaveCart(req, res);
    });
    app.get("/cart", (req, res) => {
        categoryController.getCart(req, res);
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
        itemsController.postCreate(req, res);
    });
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map