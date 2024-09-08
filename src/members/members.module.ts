import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from '../models/entities/Members.entity';
import { BooksBorrow } from '../models/entities/BooksBorrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Members, BooksBorrow])],
  controllers: [MembersController],
  providers: [MembersService]
})
export class MembersModule {}
