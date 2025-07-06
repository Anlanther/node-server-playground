import { Controller, Get } from '@nestjs/common';
import { PptGeneratorService } from './ppt-generator.service';

@Controller('ppt-generator')
export class PptGeneratorController {
  constructor(private readonly pptGeneratorService: PptGeneratorService) {}

  @Get()
  async getHello() {
    const slides = await this.pptGeneratorService.generateSlides();
    console.log('slides', slides);
    return slides;
  }
}
