import express from 'express';
import cors from 'cors';
import { listBalances, postBalances } from './controllers/balances.js';
import authentication from './controllers/authentication.js';
import * as userController from './controllers/userController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', userController.signIn);
app.post('/signup', userController.signUp);
app.post('/logout', userController.signOut);
app.get('/balances', authentication, listBalances);
app.post('/balances', authentication, postBalances);

export default app;
