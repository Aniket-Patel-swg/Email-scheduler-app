export class APIRespone {
    message?: string
    status: number
    data: any

    constructor(status: number, message?: string, data?: Object) {
        this.message = message;
        this.status = status;
        this.data = data
    }
}