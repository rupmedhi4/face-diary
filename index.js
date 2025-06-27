import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db.js';
import userRoute from "./routes/user.route.js";

const port = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://secret-diary-frontend.vercel.app'
];

// CORS config
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', userRoute);

// Connect DB and start server
db().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
});
