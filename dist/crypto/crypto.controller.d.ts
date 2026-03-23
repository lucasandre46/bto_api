import { CryptoService } from './crypto.service';
import { TopCoinsQueryDto } from './dto/crypto-query.dto';
export declare class CryptoController {
    private readonly cryptoService;
    constructor(cryptoService: CryptoService);
    getBitcoinPrice(): Promise<any>;
    getTopCoins(query: TopCoinsQueryDto): Promise<any>;
}
