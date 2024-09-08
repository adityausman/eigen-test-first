import { BookDto } from "./bookDto.dto";

export class BooksBorrowDto {
    transId: string;
    transDate: Date;
    isReturn: boolean;
    penaltyDate: Date;
    books: BookDto[];
}