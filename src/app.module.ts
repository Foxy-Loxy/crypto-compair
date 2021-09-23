import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoModule } from './modules/crypto/crypto.module';
import { ormConfig } from './common/configs/orm.config';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    CryptoModule,
    TypeOrmModule.forRoot(ormConfig),
    TaskModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
