import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class TopCoinsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O valor de perPage deve ser um número inteiro.' })
  @Min(1, { message: 'O valor mínimo é 1.' })
  @Max(100, { message: 'O valor máximo é 100.' })
  perPage?: number;
}
