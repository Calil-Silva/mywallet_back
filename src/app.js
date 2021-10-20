import express from "express";
import cors from "cors";
import { login } from "./controllers/login.js";
import { signup } from "./controllers/signup.js";
import { listBalances, postBalances } from "./controllers/balances.js";


const app = express();
app.use(cors());
app.use(express.json());

//LOGIN
app.post('/login', login);

//SIGNUP
app.post('/signup', signup);

//BALANCES
app.get('/balances', listBalances);
app.post('/balances', postBalances);

app.listen(4000);