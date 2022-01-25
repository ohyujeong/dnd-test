import {IsString, IsNumber} from 'class-validator'

export class CreateUserDto {
    @IsString()
    readonly email: string;
    
    @IsString()
    readonly accessToken: string;
}