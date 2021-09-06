import {MigrationInterface, QueryRunner} from "typeorm";

export class IsCheckedFix1630855019190 implements MigrationInterface {
    name = 'IsCheckedFix1630855019190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" ALTER COLUMN "isChecked" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" ALTER COLUMN "isChecked" SET NOT NULL`);
    }

}
