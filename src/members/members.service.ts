import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Members } from '../models/entities/Members.entity';
import { Repository } from 'typeorm';
import { BooksBorrow } from '../models/entities/BooksBorrow.entity';
import { MemberDto } from 'src/dtos/views/memberDto.dto';

@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Members)
        private readonly membersRepository: Repository<Members>,
        @InjectRepository(BooksBorrow)
        private readonly booksBorrowRepository: Repository<BooksBorrow>
    ){}
    async getAll(): Promise<Members[]>{
        return await this.membersRepository.find();
    }

    async findMemberBorrowedBooks(memberCode: string){
        const member = await this.membersRepository.findOne({
            where: {memberCode},
            relations: ['booksBorrows', 'booksBorrows.books']
        })
        if (!member){
            throw new NotFoundException('Member tidak ditemukan');
        }
        const memberDto: MemberDto = {
            memberCode: member.memberCode,
            name: member.name,
            booksBorrows: member.booksBorrows.map(borrow => ({
                transId: borrow.transId,
                transDate: borrow.transDate,
                isReturn: borrow.isReturn,
                penaltyDate: borrow.penaltyDate,
                books: borrow.books.map(book => ({
                    bookCode: book.bookCode,
                    title: book.title,
                    author: book.author,
                })),
            })),
        };
    
        return memberDto;
    }
}
