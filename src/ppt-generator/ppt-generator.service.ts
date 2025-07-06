import { Injectable } from '@nestjs/common';
import * as path from 'path';
import Automizer, { ISlide, modify } from 'pptx-automizer';
import { FundData, FundDataForKey } from './models/fund-data.model';

@Injectable()
export class PptGeneratorService {
  async generateSlides(funds: FundData[]): Promise<NodeJS.ReadableStream> {
    const templateDir = path.join(
      process.cwd(),
      'src',
      'ppt-generator',
      'pptx-templates',
    );
    const titlePath = path.join(templateDir, 'Title.pptx');
    const summaryPath = path.join(templateDir, 'Summary.pptx');
    const strategyPath = path.join(templateDir, 'Strategy.pptx');

    const automizer = new Automizer({
      templateDir,
      useCreationIds: false,
      autoImportSlideMasters: true,
      removeExistingSlides: true,
      compression: 0,
      verbosity: 1,
      cleanupPlaceholders: false,
    });

    const pres = automizer
      .loadRoot(titlePath)
      .load(titlePath, 'title')
      .load(strategyPath, 'strategy')
      .load(summaryPath, 'summary');

    this.generateTitle(pres, 1, funds[0]);

    funds.forEach((fundData) => {
      this.generateSummary(pres, 1, fundData);
      this.generateStrategy(pres, 1, fundData);
    });

    return pres.stream();
  }

  generateSummary(
    pres: Automizer,
    index: number,
    fundData: FundData,
  ): Automizer {
    return pres.addSlide('summary', index, this.getSlideCallback(fundData));
  }

  generateTitle(pres: Automizer, index: number, fundData: FundData): Automizer {
    return pres.addSlide('title', index, this.getSlideCallback(fundData));
  }

  generateStrategy(
    pres: Automizer,
    index: number,
    fundData: FundData,
  ): Automizer {
    return pres.addSlide('strategy', index, this.getSlideCallback(fundData));
  }

  private getSlideCallback(fundData: FundData) {
    const slideCallback = (slide: ISlide) => {
      slide
        .getAllElements()
        .then((elements) => {
          const updatedFundDetail = this.prepareFundData(fundData);
          console.log('Replacement data:', updatedFundDetail);
          elements.forEach((element) => {
            if (element) {
              console.log(
                'Element name:',
                element.name,
                'Text:',
                element.getText(),
              );
              try {
                slide.modifyElement(element.name, [
                  modify.replaceText([
                    ...Object.keys(updatedFundDetail).map((key) => ({
                      replace: key,
                      by: {
                        text: String(
                          updatedFundDetail[key as keyof FundDataForKey] ?? '',
                        ),
                      },
                    })),
                  ]),
                ]);
              } catch (err) {
                console.error(`Error modifying element ${element.name}:`, err);
              }
            }
          });
        })
        .catch((err) => {
          throw new Error(`Error: ${err}`);
        });
    };
    return slideCallback;
  }

  private prepareFundData(fundData: FundData): FundDataForKey {
    const portfolioManagers = fundData.portfolioManagers.map((pm, i) => ({
      [`portfolioManager${i + 1}`]: pm.detail,
    }));

    const updatedFundDetail: FundDataForKey = {
      date: fundData.date,
      fundName: fundData.fundName,
      investmentApproach: fundData.investmentApproach,
      overview: fundData.overview,
      noStocks: fundData.noStocks,
      stockLimit: fundData.stockLimit,
      sectorLimit: fundData.sectorLimit,
      countryLimit: fundData.countryLimit,
      riskActiveMoney: fundData.riskActiveMoney,
      riskTrackError: fundData.riskTrackError,
      minMarketCap: fundData.minMarketCap,
      turnover: fundData.turnover,
      cash: fundData.cash,
      morningstarStyle: fundData.morningstarStyle,
      launchDate: fundData.launchDate,
      comparativeIndex: fundData.comparativeIndex,
      sector: fundData.sector,
      fundStructure: fundData.fundStructure,
      fundSize: fundData.fundSize,
      ocf: fundData.ocf,
      isin: fundData.isin,
      sendol: fundData.sendol,
      fundPerformance: fundData.fundPerformance,
      fundPositioning: fundData.fundPositioning,
      ...portfolioManagers.reduce((acc, pm) => ({ ...acc, ...pm }), {}),
    };
    return updatedFundDetail;
  }
}
