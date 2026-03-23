import { IsString, IsNotEmpty } from 'class-validator';

export class MarketQueryDto {
  @IsString({ message: 'O símbolo deve ser uma string.' })
  @IsNotEmpty({ message: 'O parâmetro "symbols" não pode estar vazio.' })
  symbols: string;
}
