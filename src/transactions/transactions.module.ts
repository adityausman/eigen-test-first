import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksBorrow } from '../models/entities/BooksBorrow.entity';
import { Books } from '../models/entities/Books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BooksBorrow, Books])],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
