"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const ItemsController_1 = require("../controllers/ItemsController");
const itemsController = new ItemsController_1.ItemsController();
function registerRoutes(app) {
    app.get("/", (req, res) => {
        itemsController.index(req, res);
    });
    app.get("/bitcoin", (req, res) => {
        itemsController.bitcoin(req, res);
    });
    app.get("/getUserData", (req, res) => {
        itemsController.getUserData(req, res);
    });
    app.get("/data", (req, res) => {
        itemsController.data(req, res);
    });
    app.post("/clicker", (req, res) => {
        itemsController.clicker(req, res);
    });
    app.post("/createData", (req, res) => {
        itemsController.createData(req, res);
    });
    app.get("/buyCript", (req, res) => {
        itemsController.buyCript(req, res);
    });
}
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=index.js.map