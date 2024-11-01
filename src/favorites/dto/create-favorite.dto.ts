import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsInt()
  id_character: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  @IsOptional()
  species?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  details?: string;
}
