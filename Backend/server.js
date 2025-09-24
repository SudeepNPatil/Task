import express from 'express';
import cors from 'cors';
import db from './db.js';
import signuprouter from './Router/signuprouter.js';
import loginrouter from './Router/loginrouter.js';
import Taskroute from './models/Task.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

db();

app.use(cors());
app.use(express.json());

app.use('/signup', signuprouter);

app.use('/login', loginrouter);

app.use('/tasks', Taskroute);

app.listen(process.env.PORT, () => {
  console.log(
    `\nserver is running on port http://localhost:${process.env.PORT}`
  );
});
