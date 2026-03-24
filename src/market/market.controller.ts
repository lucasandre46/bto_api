import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketQueryDto } from './dto/market-query.dto';
import { SupabaseGuard } from '../common/guards/supabase.guard';

@Controller('market')
@UseGuards(SupabaseGuard) // PROTEÇÃO ATIVADA
export class MarketController {
    constructor(private readonly marketService: MarketService) { }

    @Get('card')
    async getCard(@Query() query: MarketQueryDto) {
        return this.marketService.getMarketData(query.symbols);
    }
}