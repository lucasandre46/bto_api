import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class MarketService {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    getMarketData(symbols: string): Promise<{
        symbol: any;
        price: any;
        change: any;
        logo: any;
    }[]>;
}
