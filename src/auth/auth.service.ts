import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) { }

    async register(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                senha: createUserDto.senha,
                nome: createUserDto.nome,
                telefone: createUserDto.telefone,
            },
        });
        return user;
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: loginUserDto.email,
            },
        });
        if (!user) {
            throw new Error('Usuario nao encontrado');
        }
        if (user.senha !== loginUserDto.senha) {
            throw new Error('Senha incorreta');
        }
        return user;
    }
}
