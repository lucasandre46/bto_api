import { Controller, Get, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) { }

    @Get('bitcoin')
    async getBitcoinPrice() {
        return this.cryptoService.getBitcoinPrice();
    }

    @Get('top-coins')
    async getTopCoins(@Query('perPage') perPage?: string) {
        const limit = perPage ? parseInt(perPage, 10) : 10;
        return this.cryptoService.getTopCoins(limit);
    }
}
