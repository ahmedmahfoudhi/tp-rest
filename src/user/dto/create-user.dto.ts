import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(100)
    name;
    
    @IsNotEmpty()
    @IsEmail()
    email;

    @IsNotEmpty()
    @MinLength(10)
    password;

    
}
