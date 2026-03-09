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
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let MarketService = class MarketService {
    httpService;
    configService;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async getMarketData(symbols) {
        const token = this.configService.get('BRAPI_TOKEN');
        const symbolArray = symbols.split(',').map(s => s.trim());
        try {
            const requests = symbolArray.map(s => (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://brapi.dev/api/quote/${s}?range=1d&interval=1h&token=${token}`)));
            const responses = await Promise.all(requests);
            return responses.map(res => {
                const asset = res.data.results[0];
                return {
                    symbol: asset.symbol,
                    longName: asset.longName || asset.shortName,
                    price: asset.regularMarketPrice,
                    change: asset.regularMarketChangePercent,
                    logo: asset.logourl,
                    history: asset.historicalDataPrice?.map((point) => point.close) || []
                };
            });
        }
        catch (error) {
            console.error('Erro na Brapi:', error.response?.data || error.message);
            throw new common_1.HttpException('Falha ao buscar dados do mercado', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHistory(symbol) {
        const token = this.configService.get('BRAPI_TOKEN');
        const url = `https://brapi.dev/api/quote/${symbol}?range=5d&interval=1d&token=${token}`;
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            const history = data.results[0].historicalDataPrice;
            return history.map((point) => point.close);
        }
        catch (error) {
            return [];
        }
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MarketService);
//# sourceMappingURL=market.service.js.map