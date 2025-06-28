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
  'https://secret-diary-frontend-vusb.vercel.app',
  'https://secret-diary-frontend-slt5.vercel.app',
  'https://secret-diary-frontend-p2lc.vercel.app'
  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
