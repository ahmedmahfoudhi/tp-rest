import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class CreateCvDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    firstname:string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    age:number;

    @IsNotEmpty()
    @IsNumberString()
    cin:string;

    @IsNotEmpty()
    job:string;

    @IsOptional()
    path:string;
}
