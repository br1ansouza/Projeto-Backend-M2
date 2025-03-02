import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFullAddressToUsers1740872591777 implements MigrationInterface {
    name = 'AddFullAddressToUsers1740872591777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_address"`);
    }

}
