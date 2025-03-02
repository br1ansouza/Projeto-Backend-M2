import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProducts1740875314011 implements MigrationInterface {
    name = 'CreateTableProducts1740875314011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "amount" integer NOT NULL, "description" character varying(200) NOT NULL, "url_cover" character varying(200), "branch_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_de720484cb95d8752861e507921" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_de720484cb95d8752861e507921"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
