import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Branch } from "./Branch";
import { Movement } from "./Movement";

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

    @ManyToOne(() => Branch, (branch) => branch.products)
    @JoinColumn({ name: "branch_id" })
    branch: Branch;

    @OneToMany(() => Movement, (movement) => movement.product)
    movements: Movement[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
