import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { db } from './db.js';
import userRoute from "./routes/user.route.js"

const port = process.env.PORT || 5000;
const app = express();



app.use(cors({
  origin: "http://localhost:5173",  // 👈 your frontend port (Vite)
  credentials: true                 // 👈 must for cookies
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/user', userRoute)

db().then(
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
)
