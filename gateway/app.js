import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';

dotenv.config();

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan('tiny')); //log requests
app.use(cors());

app.use('/course', proxy('http://localhost:8001'));
app.use('/user', proxy('http://localhost:8002'));
app.use('/enrollment', proxy('http://localhost:8003'));

//server config
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  try {
    console.log(`Gateway is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
