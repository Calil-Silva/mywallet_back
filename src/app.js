import express from 'express';
import cors from 'cors';
import authentication from './controllers/authentication.js';
import * as userController from './controllers/userController.js';
import * as balanceController from './controllers/balanceController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signin', userController.signIn);
app.post('/signup', userController.signUp);
app.delete('/signout', userController.signOut);
app.get('/balances', authentication, balanceController.listBalances);
app.post('/balances', authentication, balanceController.postBalances);

export default app;
