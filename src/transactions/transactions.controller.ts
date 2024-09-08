import { BadRequestException, Body, Controller, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { BorrowBooksDto } from '../dtos/transactions/borrowBooksDto.dto';
import { Response } from 'express';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transService: TransactionsService
    ){}

    @Post('borrow-books')
    async borrowBooks(@Body() borrow: BorrowBooksDto, @Res() res: Response){
        try {
            const result = await this.transService.borrowBook(borrow);
            res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Books dipinjam'
            })
        } catch (error) {
            if (error instanceof BadRequestException){
                res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.message,
                  });
            }else if (error instanceof NotFoundException) {
                res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Tidak ditemukan',
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error' + error,
                });
            }
        }
    }

    @Put('return/:memberCode')
    async returnBook(@Param('memberCode') memberCode: string, @Res() res: Response){
        try {
            const result = await this.transService.returnBook(memberCode);
            res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: result.message
            })
        } catch (error) {
            if (error instanceof BadRequestException){
                res.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.message,
                  });
            }else if (error instanceof NotFoundException) {
                res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Tidak ditemukan',
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error',
                });
            }
        }
        

    }
}
