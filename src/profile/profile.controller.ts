import { Controller, Get, Post, Headers, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    private extractToken(authHeader: string) {
        if (!authHeader) {
            throw new UnauthorizedException('Token não fornecido');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Formato de token inválido');
        }
        return token;
    }

    @Get()
    getProfile(@Headers('authorization') authHeader: string) {
        const token = this.extractToken(authHeader);
        return this.profileService.getProfile(token);
    }

    @Post('favorite')
    toggleFavorite(
        @Headers('authorization') authHeader: string,
        @Body('symbol') symbol: string
    ) {
        if (!symbol) {
            throw new BadRequestException('Symbol é obrigatório');
        }
        const userId = this.extractToken(authHeader);
        return this.profileService.toggleFavorite(userId, symbol);
    }
}
