import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import { StudentsController } from '../controllers/StudentsController';
import { AuthController } from '../controllers/AuthController';
import { EventController } from '../controllers/EventController';
import { SchoolController } from '../controllers/SchoolController';

const studentsController = new StudentsController();
const authController = new AuthController();
const eventController = new EventController();
const schoolController = new SchoolController();

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
      studentsController.index(req, res);
      });
      app.get("/create",(req: Request, res: Response) => {
        studentsController.getCreate(req, res);
      }); 
      app.get("/update/:id",(req: Request, res: Response) => {
        studentsController.getUpdate(req, res);
      }); 
      app.post("/update/:id",(req: Request, res: Response) => {
        studentsController.postUpdate(req, res);
      }); 
      app.get("/students",(req: Request, res: Response) => {
        studentsController.getStudents(req, res);
      }); 
      app.get("/create_events",(req: Request, res: Response) => {
        eventController.getCreate_Events(req, res);
      });
      app.get("/schools",(req: Request, res: Response) => {
        schoolController.getSchool(req, res);
      });
      app.post("/create_school",(req: Request, res: Response) => {
        schoolController.postCreate_School(req, res);
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
        studentsController.postCreate(req, res);
      });
      app.post("/create_event",upload.single("file"), (req: Request, res: Response) => {
        eventController.postCreate_Event(req, res);
      });
}