import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBranchIdToUsers1740878931343 implements MigrationInterface {
    name = 'AddBranchIdToUsers1740878931343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_5cb5fc8514d7e6aa6034dc36771"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "full_address"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "UQ_df6fc03da2ab656df24a588e059"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "address" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "branch_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_5a58f726a41264c8b3e86d4a1de"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "branch_id"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "document" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "UQ_df6fc03da2ab656df24a588e059" UNIQUE ("document")`);
        await queryRunner.query(`ALTER TABLE "branches" ADD "full_address" character varying`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_5cb5fc8514d7e6aa6034dc36771" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
