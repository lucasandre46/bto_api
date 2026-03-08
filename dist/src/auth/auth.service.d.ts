import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(createUserDto: CreateUserDto): Promise<{
        email: string;
        senha: string;
        nome: string;
        telefone: string;
        id: string;
        favoritos: string[];
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        email: string;
        senha: string;
        nome: string;
        telefone: string;
        id: string;
        favoritos: string[];
    }>;
}
