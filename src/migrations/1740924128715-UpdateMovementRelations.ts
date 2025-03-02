import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMovementRelations1740924128715 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE movements 
            ADD COLUMN destination_branch_id INT NOT NULL,
            ADD CONSTRAINT FK_movements_destination_branch FOREIGN KEY (destination_branch_id) REFERENCES branches(id) ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE movements DROP CONSTRAINT FK_movements_destination_branch;
            ALTER TABLE movements DROP COLUMN destination_branch_id;
        `);
    }
}
