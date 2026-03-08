import { Controller, Get, Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
    constructor(private readonly marketService: MarketService) { }

    @Get('card') // Mantive 'card' conforme seu log de erro mostrou
    async getCard(@Query('symbols') symbols: string) {
        // symbols aqui será "BTC" ou "BTC,ETH"
        return this.marketService.getMarketData(symbols);
    }
}