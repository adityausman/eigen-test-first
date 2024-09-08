import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [MembersModule, 
            BooksModule, 
            TransactionsModule,
            TypeOrmModule.forRoot({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: '',
              database: 'db_book',
              entities: [__dirname + '/models/entities/*.ts'],
              synchronize: true,
            }),
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
