import { HttpService } from '@nestjs/axios';
export declare class CryptoService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getBitcoinPrice(): Promise<any>;
    getTopCoins(perPage?: number): Promise<any>;
}
