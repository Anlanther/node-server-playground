import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MOCK_FUND_DATA } from './dummy-data/fund-data.mock';
import { PptGeneratorService } from './ppt-generator.service';

@Controller('ppt-generator')
export class PptGeneratorController {
  constructor(private readonly pptGeneratorService: PptGeneratorService) {}

  @Get()
  async getPptxForAllFunds(@Res() res: Response) {
    const mockFunds = MOCK_FUND_DATA;
    const stream = await this.pptGeneratorService.generateSlides(mockFunds);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': 'attachment; filename="All-Funds.pptx"',
    });
    stream.pipe(res);
  }

  @Get('1')
  async getPptxForFund1(@Res() res: Response) {
    const mockFund = [MOCK_FUND_DATA[0]];
    const stream = await this.pptGeneratorService.generateSlides(mockFund);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': 'attachment; filename="Fund-1.pptx"',
    });
    stream.pipe(res);
  }

  @Get('2')
  async getPptxForFund2(@Res() res: Response) {
    const mockFunds = [MOCK_FUND_DATA[1]];
    const stream = await this.pptGeneratorService.generateSlides(mockFunds);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': 'attachment; filename="Fund-2.pptx"',
    });
    stream.pipe(res);
  }

  @Get('2-3')
  async getPptxForFund2To4(@Res() res: Response) {
    const mockFunds = [MOCK_FUND_DATA[1], MOCK_FUND_DATA[2]];
    const stream = await this.pptGeneratorService.generateSlides(mockFunds);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'Content-Disposition': 'attachment; filename="Fund-2-3.pptx"',
    });
    stream.pipe(res);
  }
}
