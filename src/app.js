import express from "express";
import cors from "cors";
import { login } from "./controllers/login.js";
import { signup } from "./controllers/signup.js";


const app = express();
app.use(cors());
app.use(express.json());

//LOGIN
app.post('/login', login);

//SIGNUP
app.post('/signup', signup);

app.listen(4000);