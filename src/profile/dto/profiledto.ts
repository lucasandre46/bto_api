import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from "class-validator";

export class FavoriteSymbolDto {

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    symbol: string[];
}