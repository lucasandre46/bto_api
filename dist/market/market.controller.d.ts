import { MarketService } from './market.service';
import { MarketQueryDto } from './dto/market-query.dto';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    getCard(query: MarketQueryDto): Promise<{
        symbol: any;
        price: any;
        change: any;
        logo: any;
        history: any;
    }[]>;
}
