const express =  require("express");
const { json } = require("body-parser");
const cookieSession  = require("cookie-session");

const { authRouter } =  require("./routes/auth");

const { NotFoundError } = require("./errors");
const { errorHandler, activeUser } = require("./middlewares");

// It will take errors from express next functions and throw
require('express-async-errors');

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== "test"
    })
);
app.use(activeUser);

app.use(authRouter);

// Set active session user


// routes here

app.all('*', async (req, res) => { 
    throw new NotFoundError();
})

// Error handling...
app.use(errorHandler);

module.exports = { app };