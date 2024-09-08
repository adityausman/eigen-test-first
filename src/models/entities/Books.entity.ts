import { Column, Entity, ManyToMany } from "typeorm";
import { BooksBorrow } from "./BooksBorrow.entity";

@Entity("books", { schema: "db_book" })
export class Books {
  @Column("varchar", { primary: true, name: "book_code", length: 10 })
  bookCode: string;

  @Column("varchar", { name: "title", nullable: true, length: 150 })
  title: string | null;

  @Column("varchar", { name: "author", nullable: true, length: 150 })
  author: string | null;

  @Column("int", { name: "stock", default: 0 })
  stock: number;

  @ManyToMany(() => BooksBorrow, (booksBorrow) => booksBorrow.books)
  booksBorrows: BooksBorrow[];
}
