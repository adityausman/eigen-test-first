import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from '../models/entities/Books.entity';
import { BooksBorrow } from '../models/entities/BooksBorrow.entity';
import { In, Repository } from 'typeorm';
import { BorrowBooksDto } from '../dtos/transactions/borrowBooksDto.dto';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(BooksBorrow)
        private booksBorrowRepository: Repository<BooksBorrow>,
        @InjectRepository(Books)
        private booksRepository: Repository<Books>
    ){}

    async borrowBook(borrow: BorrowBooksDto){
        const{transDate, memberCode, books} = borrow;
        if (books.length> 2){
            throw new BadRequestException("Tidak boleh meminjam lebih dari 2 buku");
        }
        const booksBorrow = await this.booksBorrowRepository.findOne({
            where: { memberCode },
            relations: ['books'],
            order: { transDate: 'DESC' }
        });
        if (booksBorrow != null){
            if (booksBorrow.penaltyDate) {
                const currentDate = new Date(transDate);
                const penaltyEndDate = new Date(booksBorrow.penaltyDate);
                penaltyEndDate.setDate(penaltyEndDate.getDate() + 3); 
                const formattedDate = `${penaltyEndDate.getDate().toString().padStart(2, '0')}/${(penaltyEndDate.getMonth() + 1).toString().padStart(2, '0')}/${penaltyEndDate.getFullYear()}`;
                if (currentDate < penaltyEndDate) {
                    throw new BadRequestException(`Member ini terkena penalti dan tidak bisa meminjam buku hingga tanggal ${formattedDate}`);
                }
            }
        }
        

        const transId = uuidv7();
        await this.booksBorrowRepository.manager.transaction(async (transactionalEntityManager) => {
            const selBooks = await transactionalEntityManager.find(Books, {
                where:{
                    bookCode: In(books)
                }
            });
            if(selBooks.length !== books.length){
                throw new BadRequestException('Buku yang dipilih tidak ada');
            }
            const outOfStockBooks = selBooks.filter(book => book.stock <= 0).map(book => book.bookCode);
            if (outOfStockBooks.length > 0) {
                throw new BadRequestException(`Buku dengan kode ${outOfStockBooks.join(' dan ')} sudah dipinjam.`);
            }
    
            for(const book of selBooks){
                book.stock -= 1;
                await transactionalEntityManager.save(book)
            }

            const booksBorrow = this.booksBorrowRepository.create({
                transId,
                transDate,
                memberCode,
                isReturn: false,
                books: selBooks
            })
            return transactionalEntityManager.save(booksBorrow)
        })

    }

    async returnBook(memberCode: string): Promise<{ statusCode: number; message: string }>{
        let penaltyMessages = ''; 
        const booksBorrows = await this.booksBorrowRepository.find({
            where: {memberCode, isReturn: false},
            relations: ['books']
        })

        if (!booksBorrows || booksBorrows.length === 0) {
            throw new NotFoundException('Tidak ada transaksi peminjaman yang ditemukan atau semua buku sudah dikembalikan.');
        }

        await this.booksBorrowRepository.manager.transaction(async (transactionalEntityManager) => {
            for (const booksBorrow of booksBorrows) {

                const currentDate = new Date();
                const diffTime = Math.abs(currentDate.getTime() - booksBorrow.transDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays > 7) {
                    const penaltyDate = new Date(currentDate);
                    penaltyDate.setDate(penaltyDate.getDate() + 3);

                    booksBorrow.penaltyDate = penaltyDate;
                    booksBorrow.isReturn = true;
                    await transactionalEntityManager.save(booksBorrow);
                    penaltyMessages = `Buku dengan kode transaksi ${booksBorrow.transId} telah dikembalikan setelah lebih dari 7 hari. Member terkena penalti dan tidak dapat meminjam buku selama 3 hari sampai ${penaltyDate.toDateString()}.`;

                }else{
                    booksBorrow.isReturn = true;
                    await transactionalEntityManager.save(booksBorrow);
                }

                
    
                for (const book of booksBorrow.books) {
                    book.stock += 1;
                    await this.booksRepository.save(book); 
                }
            }
        })
        if (penaltyMessages != '') {
            return {
                statusCode: 200,
                message: penaltyMessages
            };
        } else {
            return {
                statusCode: 200,
                message: "Buku berhasil dikembalikan.",
            };
        }
    }
}
