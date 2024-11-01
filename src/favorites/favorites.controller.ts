import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ResponseDto } from '../common/dto/response.dto';
import { Favorite } from './entities/favorite.entity';

@Controller('favorites')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);

  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
  ): Promise<ResponseDto<Favorite>> {
    try {
      const favorite =
        await this.favoritesService.addFavorite(createFavoriteDto);

      if (!favorite) {
        this.logger.error('Failed to add favorite: Data returned is null');
        return new ResponseDto('Failed to add favorite', false);
      }

      this.logger.log(`Favorite added with ID: ${favorite.id}`);
      return new ResponseDto('Favorite added successfully', true, favorite);
    } catch (error) {
      this.logger.error(`Failed to add favorite: ${error.message}`);
      return new ResponseDto('Failed to add favorite', false);
    }
  }

  @Get()
  async getFavorites(): Promise<ResponseDto<Favorite[]>> {
    try {
      const favorites = await this.favoritesService.getFavorites();

      if (!favorites || favorites.length === 0) {
        this.logger.warn('No favorites found');
        return new ResponseDto('No favorites found', false);
      }

      this.logger.log('Retrieved all favorites');
      return new ResponseDto(
        'Favorites retrieved successfully',
        true,
        favorites,
      );
    } catch (error) {
      this.logger.error(`Failed to retrieve favorites: ${error.message}`);
      return new ResponseDto('Failed to retrieve favorites', false);
    }
  }

  @Delete(':id')
  async removeFavorite(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<Favorite>> {
    try {
      const deletedFavorite = await this.favoritesService.removeFavorite(id);

      if (!deletedFavorite) {
        this.logger.warn(`No favorite found with ID ${id} to remove`);
        return new ResponseDto('Favorite not found', false);
      }

      this.logger.log(`Favorite with ID ${id} removed`);
      return new ResponseDto(
        'Favorite removed successfully',
        true,
        deletedFavorite,
      );
    } catch (error) {
      this.logger.error(
        `Failed to remove favorite with ID ${id}: ${error.message}`,
      );
      return new ResponseDto('Failed to remove favorite', false);
    }
  }
}
