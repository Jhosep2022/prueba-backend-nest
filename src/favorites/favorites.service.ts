import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database/database.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addFavorite(
    createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite | null> {
    const { data, error } = await this.databaseService
      .getClient()
      .from('Favorite')
      .insert(createFavoriteDto)
      .single();

    if (error) throw new Error(error.message);

    if (!data) {
      console.warn('Warning: Supabase returned null data after insert');
      return null;
    }

    return data as Favorite;
  }

  async getFavorites(): Promise<Favorite[]> {
    const { data, error } = await this.databaseService
      .getClient()
      .from('Favorite')
      .select('*');

    if (error) throw new Error(error.message);
    return data as Favorite[];
  }

  async removeFavorite(id: number): Promise<Favorite | null> {
    const { data, error } = await this.databaseService
      .getClient()
      .from('Favorite')
      .delete()
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    if (!data) {
      console.warn(
        `Warning: Supabase returned null data when deleting favorite with ID ${id}`,
      );
      return null;
    }

    return data as Favorite;
  }
}
