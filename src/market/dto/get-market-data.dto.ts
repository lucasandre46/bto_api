import { IsString, IsNotEmpty } from 'class-validator';

export class GetMarketDataDto {
    @IsString()
    @IsNotEmpty({ message: 'O símbolo da ação/cripto (symbol) é obrigatório.' })
    symbol: string;
}
