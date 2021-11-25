import express from 'express';
import cors from 'cors';
import login from './controllers/login.js';
import signup from './controllers/signup.js';
import { listBalances, postBalances } from './controllers/balances.js';
import logoutUser from './controllers/logout.js';
import authentication from './controllers/authentication.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', login);

app.post('/signup', signup);

app.get('/balances', authentication, listBalances);
app.post('/balances', authentication, postBalances);

app.post('/logout', logoutUser);

export default app;
