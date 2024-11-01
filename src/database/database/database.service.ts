import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class DatabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('SUPABASE_KEY');

    if (!url || !key) {
      this.logger.error('SUPABASE_URL and SUPABASE_KEY must be provided');
      throw new Error('SUPABASE_URL and SUPABASE_KEY are missing');
    }

    this.supabase = createClient(url, key);
    this.logger.log('Connected to Supabase');
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
