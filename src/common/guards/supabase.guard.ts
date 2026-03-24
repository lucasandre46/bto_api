import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseGuard implements CanActivate {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY') || '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthorizedException('Formato de token inválido.');
    }

    // Valida o token com o Supabase
    const { data: { user }, error } = await this.supabase.auth.getUser(token);

    if (error || !user) {
      console.error('Erro na validação do Supabase:', error?.message);
      throw new UnauthorizedException('Usuário não autenticado ou token expirado.');
    }

    // Adiciona o usuário à requisição para uso posterior se necessário
    request.user = user;
    return true;
  }
}
