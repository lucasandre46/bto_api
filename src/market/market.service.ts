import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MarketService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async getMarketData(symbols: string) {
        const token = this.configService.get<string>('BRAPI_TOKEN');

        // Transforma "BTC,ETH" em ["BTC", "ETH"]
        const symbolArray = symbols.split(',').map(s => s.trim());

        try {
            // Faz as chamadas em paralelo para respeitar o limite de 1 por vez da Brapi Free
            const requests = symbolArray.map(s =>
                firstValueFrom(this.httpService.get(`https://brapi.dev/api/quote/${s}?token=${token}`))
            );

            const responses = await Promise.all(requests);

            return responses.map(res => {
                const asset = res.data.results[0];
                return {
                    symbol: asset.symbol,
                    price: asset.regularMarketPrice,
                    change: asset.regularMarketChangePercent,
                    logo: asset.logourl,
                };
            });
        } catch (error) {
            console.error('Erro na Brapi:', error.response?.data || error.message);
            throw new Error('Falha ao buscar dados');
        }
    }
}