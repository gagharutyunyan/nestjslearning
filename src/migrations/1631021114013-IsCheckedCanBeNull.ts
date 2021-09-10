import { MigrationInterface, QueryRunner } from 'typeorm';

export class IsCheckedCanBeNull1631021114013 implements MigrationInterface {
    name = 'IsCheckedCanBeNull1631021114013';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."task" ALTER COLUMN "isChecked" DROP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."task" ALTER COLUMN "isChecked" SET NOT NULL`,
        );
    }
}
