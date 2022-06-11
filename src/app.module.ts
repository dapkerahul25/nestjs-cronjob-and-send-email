import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cron } from './utils/cron';

@Module({
  imports: [],
  controllers: [AppController,Cron],
  providers: [AppService],
})
export class AppModule {}
