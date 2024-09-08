import { Column, Entity, OneToMany } from "typeorm";
import { BooksBorrow } from "./BooksBorrow.entity";

@Entity("members", { schema: "db_book" })
export class Members {
  @Column("varchar", { primary: true, name: "member_code", length: 10 })
  memberCode: string;

  @Column("char", { name: "name", nullable: true, length: 10 })
  name: string | null;

  @OneToMany(() => BooksBorrow, (booksBorrow) => booksBorrow.memberCode2)
  booksBorrows: BooksBorrow[];
}
