import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import { ItemsController } from '../controllers/ItemsController';
import { AuthController } from '../controllers/AuthController';
import { CategoryController } from '../controllers/CategoryController';
const itemsController = new ItemsController();
const authController = new AuthController();
const categoryController = new CategoryController();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export function registerRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        itemsController.index(req, res);
      });
      app.get("/create",(req: Request, res: Response) => {
        itemsController.getCreate(req, res);
      });
      app.get("/category",(req: Request, res: Response) => {
        categoryController.getCategory(req, res);
      });
      app.get("/category/:id",(req: Request, res: Response) => {
        categoryController.category(req, res);
      });
      app.post("/save/:id",(req: Request, res: Response) => {
        categoryController.saveToCart(req, res);
      });
      app.post("/delete_save/:id",(req: Request, res: Response) => {
        categoryController.unsaveCart(req, res);
      });
      
      app.get("/cart",(req: Request, res: Response) => {
        categoryController.getCart(req, res);
      });
      // AUTH
      app.get("/logout", (req: Request, res: Response) => {
        authController.logout(req, res);
      });
      app.get("/login", (req: Request, res: Response) => {
        authController.getLogin(req, res);
      });
      app.get("/register", (req: Request, res: Response) => {
        authController.getregister(req, res);
      });
      app.post("/register", (req: Request, res: Response) => {
        authController.postRegister(req, res);
      });
      app.post("/login", (req: Request, res: Response) => {
        authController.postLogin(req, res);
      });
      app.post("/create",upload.single("file"), (req: Request, res: Response) => {
        itemsController.postCreate(req, res);
      });
}