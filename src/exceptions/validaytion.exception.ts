import { HttpException, HttpStatus } from "@nestjs/common"

export class ValidtionException extends HttpException {
    messages: string | Record<string, any>;
    constructor(respons: string | Record<string, any>){
        super(respons, HttpStatus.BAD_REQUEST);
        this.messages = respons
    }
}