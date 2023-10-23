import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from '../controllers/ItemsController';
const itemsController = new ItemsController();
export function registerRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        itemsController.index(req, res);
      });
      app.get("/bitcoin", (req: Request, res: Response) => {
        itemsController.bitcoin(req, res);
      });
      app.get("/getUserData", (req: Request, res: Response) => {
        itemsController.getUserData(req, res);
      });
      app.get("/data", (req: Request, res: Response) => {
        itemsController.data(req, res);
      });
      app.post("/clicker", (req: Request, res: Response) => {
        itemsController.clicker(req, res);
      });
      app.post("/createData", (req: Request, res: Response) => {
        itemsController.createData(req, res);
      });
      app.get("/buyCript", (req: Request, res: Response) => {
        itemsController.buyCript(req, res);
      });
}