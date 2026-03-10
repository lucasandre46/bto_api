import { MarketService } from './market.service';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    getCard(symbols: string): Promise<{
        symbol: any;
        price: any;
        change: any;
        logo: any;
        history: any;
    }[]>;
}
