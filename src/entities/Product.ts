import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Branch } from "./Branch";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  amount: number;

  @Column({ length: 200 })
  description: string;

  @Column({ length: 200, nullable: true })
  url_cover?: string;

  @Column()
  branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: "branch_id" })
  branch: Branch;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
