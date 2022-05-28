const express =  require("express");
const { json } = require("body-parser");
const cookieSession  = require("cookie-session");

const { authRouter } =  require("./routes/auth");
const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
);

app.use(authRouter);

// app.all('*', async (req, res) => { 
//     throw new NotFoundError();
// })

// // Error handling...
// app.use(errorHandler);

module.exports = { app };