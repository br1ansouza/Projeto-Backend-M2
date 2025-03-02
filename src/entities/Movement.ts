import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Branch } from "./Branch";
import { Product } from "./Product";
import { User } from "./User";

@Entity("movements")
export class Movement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Branch, { eager: true })
    @JoinColumn({ name: "destination_branch_id" })
    destinationBranch: Branch;

    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @ManyToOne(() => User, { eager: true, nullable: true })
    @JoinColumn({ name: "driver_id" })
    driver: User;

    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "enum", enum: ["PENDING", "IN_PROGRESS", "FINISHED"], default: "PENDING" })
    status: "PENDING" | "IN_PROGRESS" | "FINISHED";

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
