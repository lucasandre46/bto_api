import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(createUserDto: CreateUserDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            nome: string;
            senha: string;
            telefone: string;
            favoritos: string[];
        };
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            nome: string;
            senha: string;
            telefone: string;
            favoritos: string[];
        };
    }>;
}
