import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: "processed_words", nullable: true, default: 0 })
  processedWords: number;

  @Column({
    name: "last_process_date",
    type: "date",
    nullable: true,
    default: null,
  })
  lastProcessDate: Date;
}
