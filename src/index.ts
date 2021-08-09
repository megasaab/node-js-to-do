import express, { Express, Request, Response } from 'express';
import mongoose, { CallbackError, Connection, mongo } from 'mongoose';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './router/route';
import { middlewarePrepareException } from './middlewares/error-middleware';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT: number = Number(process.env.PORT);
const MONGO_DB_URL: string = String(process.env.MONGO_DB_URL);

mongoose.connect(MONGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {console.log('db connected')})
.catch(() => {console.log('error in db connection!')});

const app: Express = express();
const corsOptions = {
  origin: [process.env.CORS_ORIGIN_URL || 'http://localhost:4200' , 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);
app.use(middlewarePrepareException);



app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

