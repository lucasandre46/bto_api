import { CryptoService } from './crypto.service';
export declare class CryptoController {
    private readonly cryptoService;
    constructor(cryptoService: CryptoService);
    getBitcoinPrice(): Promise<any>;
    getTopCoins(perPage?: string): Promise<any>;
}
