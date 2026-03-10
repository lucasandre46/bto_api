import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                nome: true,
                email: true,
                telefone: true,
                favoritos: true,
            }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async toggleFavorite(userId: string, symbol: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        let newFavorites = user.favoritos ? [...user.favoritos] : [];

        const isFavoritado = newFavorites.includes(symbol);

        if (isFavoritado) {
            newFavorites = newFavorites.filter((s) => s !== symbol);
        } else {
            newFavorites.push(symbol);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { favoritos: newFavorites },
            select: { favoritos: true }
        });

        return {
            message: isFavoritado ? 'Removido' : 'Adicionado',
            favoritos: updatedUser.favoritos
        };
    }
}
