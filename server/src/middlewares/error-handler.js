const { MainError }  = require("../errors");

module.exports = (err, req, res, next) => {
    if(err instanceof MainError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors : [{ message: "Something went wrong..." }]
    });
}; 