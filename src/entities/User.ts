import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ type: "enum", enum: ["DRIVER", "BRANCH", "ADMIN"] })
  profile: "DRIVER" | "BRANCH" | "ADMIN";

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 150 })
  password_hash: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  full_address?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
