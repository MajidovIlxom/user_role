import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidtionException } from "src/exceptions/validaytion.exception";


@Injectable()
export class MyValidationPipe implements PipeTransform<any>{
    async transform(value: any, meatadata: ArgumentMetadata): Promise<any>{
        const obj = plainToInstance(meatadata.metatype, value);
        const errors = await validate(obj)
        if (errors.length){
            let message = errors.map((err) => {
                return `${err.property}:  ${Object.values(err.constraints).join(', |')}`;
            })
            throw new ValidtionException(message)
        }
        return value;
    }
}