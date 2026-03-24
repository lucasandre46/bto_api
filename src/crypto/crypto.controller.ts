import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { TopCoinsQueryDto } from './dto/crypto-query.dto';
import { SupabaseGuard } from '../common/guards/supabase.guard';

@Controller('crypto')
@UseGuards(SupabaseGuard) // PROTEÇÃO ATIVADA
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) { }

    @Get('bitcoin')
    async getBitcoinPrice() {
        return this.cryptoService.getBitcoinPrice();
    }

    @Get('top-coins')
    async getTopCoins(@Query() query: TopCoinsQueryDto) {
        return this.cryptoService.getTopCoins(query.perPage);
    }
}
