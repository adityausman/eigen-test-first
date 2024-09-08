import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Books } from '../models/entities/Books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, MoreThan } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Books)
        private readonly booksRepository: Repository<Books>
    ){}
    async getAll(): Promise<Books[]>{
        return await this.booksRepository.find();
    }
    async getExisting(): Promise<Books[]>{
        return await this.booksRepository.find({
            where: {stock: MoreThan(0)}
        });
    }
}
