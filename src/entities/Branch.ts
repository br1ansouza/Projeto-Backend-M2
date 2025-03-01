import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  full_address: string;

  @Column({ unique: true })
  document: string;

  @ManyToOne(() => User, (user) => user.id)
  user_id: User;
}
