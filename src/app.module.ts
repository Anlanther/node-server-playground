import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PptGeneratorController } from './ppt-generator/ppt-generator.controller';
import { PptGeneratorService } from './ppt-generator/ppt-generator.service';

@Module({
  imports: [],
  controllers: [AppController, PptGeneratorController],
  providers: [AppService, PptGeneratorService],
})
export class AppModule {}
