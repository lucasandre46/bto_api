import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user_dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
