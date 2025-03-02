import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMovements1740922186544 implements MigrationInterface {
    name = 'CreateTableMovements1740922186544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movements_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'FINISHED')`);
        await queryRunner.query(`CREATE TABLE "movements" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "status" "public"."movements_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "destination_branch_id" integer, "product_id" integer, CONSTRAINT "PK_5a8e3da15ab8f2ce353e7f58f67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_81a78601cc668877e02df50feff" FOREIGN KEY ("destination_branch_id") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movements" ADD CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_0536efaa7e21b101f827a7c62f6"`);
        await queryRunner.query(`ALTER TABLE "movements" DROP CONSTRAINT "FK_81a78601cc668877e02df50feff"`);
        await queryRunner.query(`DROP TABLE "movements"`);
        await queryRunner.query(`DROP TYPE "public"."movements_status_enum"`);
    }

}
