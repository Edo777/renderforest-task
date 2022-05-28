const { app } =  require("./app");
const registerModules = require("./database");

const start = async () => {
    // if(!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY must be defined');
    // }

    try {
        registerModules();
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });    
}

start();