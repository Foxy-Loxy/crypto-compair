import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Controller, Get, HttpCode, Query, Sse } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { GetCurrencyRequestDto } from './dto/get.currency.request.dto';
import { CurrencyInterface } from '../../common/interfaces/currencyInterface';
import { Currency } from './entities/currency.entity';

@ApiTags('Currency')
@Controller('service')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('/price')
  @HttpCode(200)
  @ApiResponse({ type: Currency })
  async getCurrency(
    @Query() query: GetCurrencyRequestDto,
  ): Promise<CurrencyInterface> {
    return this.cryptoService.getCurrency(query.fsyms, query.tsyms);
  }

  @ApiExcludeEndpoint()
  @Sse('/price/sse')
  async sse(
    @Query() query: GetCurrencyRequestDto,
  ): Promise<Observable<{ data: CurrencyInterface }>> {
    return await this.cryptoService.getCurrencyBySse(query.fsyms, query.tsyms);
  }
}
