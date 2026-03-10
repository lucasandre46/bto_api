import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    private extractToken;
    getProfile(authHeader: string): Promise<{
        email: string;
        nome: string;
        telefone: string;
        favoritos: string[];
    }>;
    toggleFavorite(authHeader: string, symbol: string): Promise<{
        message: string;
        favoritos: string[];
    }>;
}
