import cors from 'cors';
import express from 'express';
import routes from './config/routes';

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/api/v1', routes);

export default app;
