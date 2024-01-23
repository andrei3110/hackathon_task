import express, { Express, Request, Response } from 'express';
import path from 'path';
import { registerRoutes } from './routes/index';
import session from 'express-session';
import multer from 'multer';
const app: Express = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
declare module "express-session" {
  interface SessionData {
    auth: boolean,
    
    admin:boolean,
  }
};

app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

registerRoutes(app);
