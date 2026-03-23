import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
