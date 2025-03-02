import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Movement } from "./Movement";

@Entity("branches")
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  address: string;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];

  @OneToMany(() => Product, (product) => product.branch)
  products: Product[];

  @OneToMany(() => Movement, (movement) => movement.destinationBranch)
  movements: Movement[];
}
