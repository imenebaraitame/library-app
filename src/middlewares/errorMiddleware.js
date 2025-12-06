const errorMiddleware = (err, req, res, next) => { 
    if( err.name === 'ValidationError') {
        err.status = 400;
        err.message = " Invalid data format. Please check your input.";
    };
    if( err.name === 'TypeError') {
        err.status = 400;
        err.message = " Type error occurred. check your input types.";
    }
    if (err.name === 'CastError') {
        err.status= 404;
        err.message= " Resource not found. Invalid ID format.";
    }
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

export default errorMiddleware;