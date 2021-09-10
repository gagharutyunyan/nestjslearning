import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsCheckedToTask1630832248861 implements MigrationInterface {
    name = 'AddIsCheckedToTask1630832248861';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" ADD "isChecked" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."task" ALTER COLUMN "color" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" ALTER COLUMN "color" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."task" DROP COLUMN "isChecked"`);
    }
}
