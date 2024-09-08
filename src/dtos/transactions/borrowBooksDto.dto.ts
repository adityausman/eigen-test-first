import { IsDate, IsNotEmpty, IsArray, ArrayMaxSize, IsString, IsBoolean, IsOptional, isDate, isNotEmpty } from 'class-validator';

export class BorrowBooksDto{
    @IsString()
    @IsNotEmpty()
    transId: string;

    @IsDate()
    @IsNotEmpty()
    transDate: Date;

    @IsString()
    @IsNotEmpty()
    memberCode: string;

    @IsBoolean()
    @IsOptional()
    isReturn?: boolean

    @IsDate()
    @IsOptional()
    penaltyDate?: Date

    @IsArray()
    @ArrayMaxSize(2, {message: 'Tidak boleh meminjam lebih dari 2 buku'})
    books: string[];
}