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
        const requests = symbolArray.map(async (s) => {
            try {
                const url = `https://brapi.dev/api/quote/${s}?range=5d&interval=1d&token=${token}`;
                const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
                const asset = response.data.results[0];
                return {
                    symbol: asset.symbol,
                    price: asset.regularMarketPrice || 0,
                    change: asset.regularMarketChangePercent || 0,
                    logo: asset.logourl || '',
                    history: asset.historicalDataPrice?.map((p) => p.close) || []
                };
            }
            catch (error) {
                console.error(`Erro ao buscar símbolo ${s}:`, error.message);
                return { symbol: s, price: 0, change: 0, logo: '', history: [] };
            }
        });
        return Promise.all(requests);
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