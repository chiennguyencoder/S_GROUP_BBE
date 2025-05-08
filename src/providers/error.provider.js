
const ErrorProvider = {
    formatError(error) {
        error.statusCode = error.statusCode || 500;
        error.message = error.message || "Internal server error";
        return error;
    }
}

export default ErrorProvider