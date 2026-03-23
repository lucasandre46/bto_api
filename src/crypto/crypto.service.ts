import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CryptoService {
    constructor(private readonly httpService: HttpService) { }

    async getBitcoinPrice() {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl';
        try {
            const response = await firstValueFrom(this.httpService.get(url));
            return response.data;
        } catch (error) {
            const status = error.response?.status || 'desconhecido';
            const message = error.response?.data?.error || error.message;
            console.error(`Erro CoinGecko [Status ${status}]:`, message);
            throw new HttpException(`Erro ao buscar dados da CoinGecko (${status}): ${message}`, HttpStatus.BAD_GATEWAY);
        }
    }

    async getTopCoins(perPage: number = 10) {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: 1,
            sparkline: false
        };

        try {
            const response = await firstValueFrom(this.httpService.get(url, { params }));
            return response.data.map(coin => ({
                id: coin.id,
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                image: coin.image,
                price: coin.current_price,
                marketCap: coin.market_cap,
                rank: coin.market_cap_rank,
                change24h: coin.price_change_percentage_24h
            }));
        } catch (error) {
            const status = error.response?.status || 'desconhecido';
            const message = error.response?.data?.error || error.message;
            console.error(`Erro CoinGecko Markets [Status ${status}]:`, message);
            throw new HttpException(`Erro ao buscar dados da CoinGecko Markets (${status}): ${message}`, HttpStatus.BAD_GATEWAY);
        }
    }
}
