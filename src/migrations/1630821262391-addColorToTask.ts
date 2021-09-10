import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColorToTask1630821262391 implements MigrationInterface {
    name = 'addColorToTask1630821262391';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."task" ADD "color" character varying NOT NULL DEFAULT ''`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" DROP COLUMN "color"`);
    }
}
