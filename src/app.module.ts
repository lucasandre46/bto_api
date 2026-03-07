import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [ProfileModule, MarketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
