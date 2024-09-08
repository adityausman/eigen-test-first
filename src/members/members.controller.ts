import { Controller, Get, HttpCode, HttpStatus, Param, Res } from '@nestjs/common';
import { MembersService } from './members.service';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

@Controller('members')
export class MembersController {
    constructor( private readonly membersService: MembersService){}
    @Get()
    @HttpCode(200)
    async getAll(@Res() res: Response): Promise<void>{
        try {
            const members = await this.membersService.getAll()
            if (members.length > 0){
                res.status(200).json({
                    statusCode: 200,
                    message: 'Members fetched.',
                    data: members
                })
            }else{
                res.status(404).json({
                    statusCode: 404,
                    message: 'Members not found.'
                })
            }
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error.'
            })
        }
    }

    @Get(':memberCode/borrowed-books')
    @HttpCode(200)
    async getMemberBorrowedBooks(@Param('memberCode') memberCode: string, @Res() res: Response){
        try {
            const member = await this.membersService.findMemberBorrowedBooks(memberCode);
            if(!member){
                res.status(HttpStatus.NOT_FOUND).json({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Member tidak ditemukan.'
                })
            }else{
                res.status(HttpStatus.OK).json({
                    statusCode: HttpStatus.OK,
                    message: 'Data member ditemukan.',
                    data: member
                })
            }
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error' + error
            })
        }
    }

}
