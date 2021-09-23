import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [CryptoModule],
  providers: [TaskService],
})
export class TaskModule {}
