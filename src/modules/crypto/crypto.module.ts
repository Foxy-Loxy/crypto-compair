import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Currency])],
  controllers: [CryptoController],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
