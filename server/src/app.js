const express =  require("express");
const { json } = require("body-parser");
const cors = require("cors");

const cookieParser = require('cookie-parser')
const cookieSession  = require("cookie-session");

// Routers
const { authRouter, announcementRouter, commonRouter } =  require("./routes");

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

// Common of all members
app.use(commonRouter);

// Authentication
app.use(authRouter);

// Credentials middleware (Set active session user)
app.use(activeUser);

// -------- PERMITTED ROUTES -----------

// Announcements actions ( for permitted user )
app.use(announcementRouter);

app.all('*', async (req, res) => { 
    console.log(req.activeUser);
    throw NotFoundError();
})

// Error handling...
app.use(errorHandler);

module.exports = { app };