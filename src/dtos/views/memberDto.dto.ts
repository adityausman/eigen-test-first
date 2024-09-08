import { BooksBorrowDto } from "./booksBorrowDto.dto";

export class MemberDto {
    memberCode: string;
    name: string;
    booksBorrows: BooksBorrowDto[];
}