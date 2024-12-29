export interface IEError {
    message: string;
    statusCode: number;
    status: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;

    constructor(message: string) {
        super(message);
    }

    serializeErrors(): IEError {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
        };
    }
}


export class BadRequestError extends CustomError {
    statusCode = 400;
    status = "Bad Request";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class UnauthorizedError extends CustomError {
    statusCode = 401;
    status = "Unauthorized";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends CustomError {
    statusCode = 404;
    status = "Not Found";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class InternalServerError extends CustomError {
    statusCode = 500;
    status = "Internal Server Error";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ValidationError extends CustomError {
    statusCode = 400;
    status = "Validation Error";

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
