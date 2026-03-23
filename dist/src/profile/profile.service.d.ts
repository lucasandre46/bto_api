import { PrismaService } from '../../prisma/prisma.service';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        email: string;
        nome: string;
        telefone: string;
        favoritos: string[];
    }>;
    toggleFavorite(userId: string, symbol: string): Promise<{
        message: string;
        favoritos: string[];
    }>;
}
