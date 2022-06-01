const express =  require("express");
const { json } = require("body-parser");
const cors = require("cors");

const cookieParser = require('cookie-parser')
const cookieSession  = require("cookie-session");

// Routers
const { authRouter } =  require("./routes/auth");

// Error instances
const { NotFoundError } = require("./errors");

// Middlewares
const { errorHandler, activeUser } = require("./middlewares");

// It will take errors from express next functions and throw
require('express-async-errors');

const app = express();

app.use(cors());
app.use(cookieParser());

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        sameSite: true,
        signed: false,
        // secure: process.env.NODE_ENV !== "test"
    })
);

app.use(authRouter);

app.use(activeUser);

// Set active session user


// routes here

app.all('*', async (req, res) => { 
    console.log(req.activeUser);
    throw new NotFoundError();
})

// Error handling...
app.use(errorHandler);

module.exports = { app };