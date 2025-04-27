const errorHandler = (error, req, res, next) => {
    if (!error.statusCode){
        error.statusCode = 500
    }

    const resError = {
        statusCode : error.statusCode,
        message : error.message,
        stack: error.stack
    }

    return res.status(error.statusCode).json({
        status : "error",
        error : error.message,
        // stack : error.stack
    });
}

export default errorHandler