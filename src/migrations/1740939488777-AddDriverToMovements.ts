import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDriverToMovements1740939488777 implements MigrationInterface {
    name = 'AddDriverToMovements1740939488777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" ADD "driver_id" integer`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_9e71b6679c5eae3a64b60b34cb3" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_9e71b6679c5eae3a64b60b34cb3"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP COLUMN "driver_id"`);
    }

}
