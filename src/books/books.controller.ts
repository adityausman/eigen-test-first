import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService){}
    @Get()
    @HttpCode(200)
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const books = await this.bookService.getAll();
            if(books.length > 0){
                res.status(200).json({
                    statusCode: 200,
                    message: 'Books fetched.',
                    data: books
                })
            }else{
                res.status(404).json({
                    statusCode: 404,
                    message: 'Books not found.'
                })
            }
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error.' + error
            })
        }
        
    }

    @Get('exist')
    @HttpCode(200)
    async getExisting(@Res() res: Response): Promise<void> {
        try {
            const books = await this.bookService.getExisting();
            if(books.length > 0){
                res.status(200).json({
                    statusCode: 200,
                    message: 'Data buku ditemukan.',
                    data: books
                })
            }else{
                res.status(404).json({
                    statusCode: 404,
                    message: 'Books tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error.' + error
            })
        }
        
    }
}
