import express, { Express, Request, Response } from 'express';
import path from 'path';
import { registerRoutes } from './routes/index';

const app: Express = express();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

registerRoutes(app);
