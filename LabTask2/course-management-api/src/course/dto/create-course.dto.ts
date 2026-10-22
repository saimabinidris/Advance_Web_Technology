import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateCourseDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    @IsString()
    @IsNotEmpty()
    code:string;
    @IsString()
    @IsNotEmpty()
    instructor:string;
    @Type(()=>Number)
    @Min(1, {message:'Credit must be greater than or equal to 1'})
    @Max(6, {message: 'Credit must be less than or equal to 6'})
    credits:number;
    @IsString()
    @IsOptional()
    description:string;
}