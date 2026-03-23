"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CryptoService = class CryptoService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getBitcoinPrice() {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl';
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            return response.data;
        }
        catch (error) {
            const status = error.response?.status || 'desconhecido';
            const message = error.response?.data?.error || error.message;
            console.error(`Erro CoinGecko [Status ${status}]:`, message);
            throw new common_1.HttpException(`Erro ao buscar dados da CoinGecko (${status}): ${message}`, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getTopCoins(perPage = 10) {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page: 1,
            sparkline: false
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { params }));
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
        }
        catch (error) {
            const status = error.response?.status || 'desconhecido';
            const message = error.response?.data?.error || error.message;
            console.error(`Erro CoinGecko Markets [Status ${status}]:`, message);
            throw new common_1.HttpException(`Erro ao buscar dados da CoinGecko Markets (${status}): ${message}`, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CryptoService);
//# sourceMappingURL=crypto.service.js.map