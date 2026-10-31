import { Type } from 'class-transformer';
import {IsString,IsNotEmpty,IsNumber,IsPositive,IsInt,Min,IsOptional,IsBoolean,MaxLength} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price:number;
    @IsInt()
    @Min(0)
    @IsOptional()
    @Type(()=>Number)
    stock:number;
    @IsInt()
    @Min(0)
    quantity:number;

    @IsString()
    @IsNotEmpty()
    category:string;

    @IsBoolean()
    @IsOptional()
    isActive?:boolean;
}
