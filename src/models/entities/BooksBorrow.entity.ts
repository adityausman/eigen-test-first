import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Members } from "./Members.entity";
import { Books } from "./Books.entity";

@Index("fk_relationship_3", ["memberCode"], {})
@Index("trans_date", ["transDate"], {})
@Entity("books_borrow", { schema: "db_book" })
export class BooksBorrow {
  @Column("varchar", { primary: true, name: "trans_id", length: 15 })
  transId: string;

  @Column("datetime", { name: "trans_date" })
  transDate: Date;

  @Column("varchar", { name: "member_code", length: 10 })
  memberCode: string;

  @Column("tinyint", { name: "is_return", nullable: true, width: 1 })
  isReturn: boolean | null;

  @Column("datetime", { name: "penalty_date", nullable: true })
  penaltyDate: Date | null;

  @ManyToOne(() => Members, (members) => members.booksBorrows, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "member_code", referencedColumnName: "memberCode" }])
  memberCode2: Members;

  @ManyToMany(() => Books, (books) => books.booksBorrows)
  @JoinTable({
    name: "books_borrow_detail",
    joinColumns: [{ name: "trans_id", referencedColumnName: "transId" }],
    inverseJoinColumns: [
      { name: "book_code", referencedColumnName: "bookCode" },
    ],
    schema: "db_book",
  })
  books: Books[];
    length: number;
}
