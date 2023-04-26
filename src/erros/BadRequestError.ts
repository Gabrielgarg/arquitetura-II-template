import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError{
    constructor(
        message: string = "dados inválidos"
    ){
       super(400, message)
    }
}