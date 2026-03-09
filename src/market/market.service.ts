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
        const symbolArray = symbols.split(',').map(s => s.trim());

        const requests = symbolArray.map(async (s) => {
            try {
                // MUDANÇA AQUI: range=5d e interval=1d (Obrigatório para o plano Free)
                const url = `https://brapi.dev/api/quote/${s}?range=5d&interval=1d&token=${token}`;
                const response = await firstValueFrom(this.httpService.get(url));
                const asset = response.data.results[0];

                return {
                    symbol: asset.symbol,
                    price: asset.regularMarketPrice || 0,
                    change: asset.regularMarketChangePercent || 0,
                    logo: asset.logourl || '',
                    history: asset.historicalDataPrice?.map((p: any) => p.close) || []
                };
            } catch (error) {
                // Se um símbolo der erro, retornamos um objeto vazio em vez de estourar Erro 500
                console.error(`Erro ao buscar símbolo ${s}:`, error.message);
                return { symbol: s, price: 0, change: 0, logo: '', history: [] };
            }
        });

        return Promise.all(requests);
    }

    async getHistory(symbol: string) {
        const token = this.configService.get<string>('BRAPI_TOKEN');
        const url = `https://brapi.dev/api/quote/${symbol}?range=5d&interval=1d&token=${token}`;

        try {
            const { data } = await firstValueFrom(this.httpService.get(url));
            const history = data.results[0].historicalDataPrice;
            return history.map((point: any) => point.close);
        } catch (error) {
            return [];
        }
    }
}