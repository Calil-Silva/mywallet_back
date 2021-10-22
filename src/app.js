import express from "express";
import cors from "cors";
import { login } from "./controllers/login.js";
import { signup } from "./controllers/signup.js";
import { listBalances, postBalances } from "./controllers/balances.js";
import { logoutUser } from "./controllers/logout.js";


const app = express();
app.use(cors());
app.use(express.json());

//LOGIN
app.post('/', login);

//SIGNUP
app.post('/signup', signup);

//BALANCES
app.get('/balances', listBalances);
app.post('/balances', postBalances);

//LOGOUT
app.post('/logout', logoutUser);

app.listen(4000);