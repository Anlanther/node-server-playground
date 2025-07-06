import { Injectable } from '@nestjs/common';
import * as path from 'path';
import Automizer, { ISlide, modify } from 'pptx-automizer';
import { MOCK_FUND_DATA } from './dummy-data/fund-data.mock';
import { FundData, FundDataForKey } from './models/fund-data.model';

@Injectable()
export class PptGeneratorService {
  async generateSlides(): Promise<NodeJS.ReadableStream> {
    const templateDir = path.join(
      process.cwd(),
      'src',
      'ppt-generator',
      'pptx-templates',
    );
    const outputDir = path.join(process.cwd(), 'output');
    const titlePath = path.join(templateDir, 'Title.pptx');
    const summaryPath = path.join(templateDir, 'Summary.pptx');

    const automizer = new Automizer({
      templateDir,
      outputDir,
      useCreationIds: false,
      autoImportSlideMasters: true,
      removeExistingSlides: false,
      compression: 0,
      verbosity: 1,
      cleanupPlaceholders: false,
    });

    const pres = automizer.loadRoot(titlePath).load(summaryPath, 'summary');

    return await this.generateSummary(pres, MOCK_FUND_DATA);
  }

  async generateSummary(
    pres: Automizer,
    fundData: FundData,
  ): Promise<NodeJS.ReadableStream> {
    const slideCallback = (slide: ISlide) => {
      slide
        .getAllElements()
        .then((elements) => {
          elements.forEach((element) => {
            if (element) {
              try {
                const updatedFundDetail = this.prepareFundData(fundData);
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
    pres.addSlide('summary', 1, slideCallback);

    return pres.stream();
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

// // First, let's set some preferences!
// pres.addSlide('Summary.pptx', 2, (slide) => {
//   slide.modifyElement();
// });

// // Get useful information about loaded templates:
// /*
// const presInfo = await pres.getInfo();
// const mySlides = presInfo.slidesByTemplate('shapes');
// const mySlide = presInfo.slideByNumber('shapes', 2);
// const myShape = presInfo.elementByName('shapes', 2, 'Cloud');
// */

// // addSlide takes two arguments: The first will specify the source
// // presentation's label to get the template from, the second will set the
// // slide number to require.
// pres
//   .addSlide('graph', 1)
//   .addSlide('shapes', 1)
//   .addSlide('SlideWithImages.pptx', 2);

// // Finally, we want to write the output file.
// pres.write('strategy-pop.pptx').then((summary) => {
//   console.log(summary);
// });

// // You can e.g. output the pptx archive to stdout instead of writing a file:
// stream.pipe(process.stdout);

// // If you need any other output format, you can eventually access
// // the underlying JSZip instance:
// const finalJSZip = await pres.getJSZip();
// // Convert the output to whatever needed:
// const base64 = await finalJSZip.generateAsync({ type: 'base64' });
