import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { interval, Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from './entities/currency.entity';
import { CurrencyInterface } from '../../common/interfaces/currencyInterface';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
    private readonly httpService: HttpService,
  ) {}

  async getCurrencyFromAPI(fromCoin: string, toCoin: string) {
    const currency = await this.currencyRepository.find({
      where: {
        fromCoin,
        toCoin,
      },
      order: {
        id: 'DESC',
      },
    });

    if (!currency.length) {
      throw new BadRequestException('Wrong coins pare');
    }
    return currency;
  }

  async getCurrencyFromCryptoCompare(
    fromCoin: string,
    toCoin: string,
  ): Promise<CurrencyInterface[]> {
    const requestLink = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromCoin}&tsyms=${toCoin}`;
    const cryptoCompareResponse = await this.httpService
      .get(requestLink)
      .toPromise();

    const cryptoCompareResponseData = cryptoCompareResponse.data.RAW;

    if (!cryptoCompareResponseData) {
      return this.getCurrencyFromAPI(fromCoin, toCoin);
    }

    const fromCoinsArr = Object.keys(cryptoCompareResponseData);
    const currencyArr: CurrencyInterface[] = [];

    for (let i = 0; i < fromCoinsArr.length; i += 1) {
      const exchangeResultRAW = cryptoCompareResponseData[fromCoinsArr[i]];

      for (const coin in exchangeResultRAW) {
        const toCoinData = exchangeResultRAW[coin];
        currencyArr.push({
          fromCoin: fromCoinsArr[i],
          toCoin: coin,
          CHANGE24HOUR: toCoinData.CHANGE24HOUR,
          CHANGEPCT24HOUR: toCoinData.CHANGEPCT24HOUR,
          HIGH24HOUR: toCoinData.HIGH24HOUR,
          LOW24HOUR: toCoinData.LOW24HOUR,
          MKTCAP: toCoinData.MKTCAP,
          OPEN24HOUR: toCoinData.OPEN24HOUR,
          PRICE: toCoinData.PRICE,
          SUPPLY: toCoinData.SUPPLY,
          VOLUME24HOUR: toCoinData.VOLUME24HOUR,
          VOLUME24HOURTO: toCoinData.VOLUME24HOURTO,
        });
      }
    }
    return currencyArr;
  }

  async saveNewCurrencyData(fromCoins: string, toCoins: string) {
    const currency = await this.getCurrencyFromCryptoCompare(
      fromCoins,
      toCoins,
    );
    await this.currencyRepository.save(currency);
  }

  async getCurrency(
    fromCoin: string,
    toCoin: string,
  ): Promise<CurrencyInterface> {
    const currency = await this.getCurrencyFromCryptoCompare(fromCoin, toCoin);
    return currency[0];
  }

  async getCurrencyBySse(
    fromCoin: string,
    toCoin: string,
  ): Promise<Observable<{ data: CurrencyInterface }>> {
    return interval(+process.env.SSEINTERVAL).pipe(
      switchMap(async () => await this.getCurrency(fromCoin, toCoin)),
      map((currency) => ({
        data: {
          ...currency,
        },
      })),
    );
  }
}
