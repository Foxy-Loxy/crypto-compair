import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CryptoService } from '../crypto/crypto.service';
import { fromCoins, toCoins } from '../../common/constants/coins';

const twoMinutesCroneRule = '*/2 * * * *';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly cryptoService: CryptoService) {}

  @Cron(twoMinutesCroneRule)
  async handleCron() {
    await this.cryptoService.saveNewCurrencyData(fromCoins, toCoins);
    this.logger.debug('Currency checked every 2 minutes');
  }
}
